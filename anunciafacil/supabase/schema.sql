-- Anuncio Fácil: tablas y permisos. Pégalo entero en Supabase → SQL Editor → Run.

-- Perfil de cada cliente: datos del negocio + estado de la suscripción.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  business_name text not null default '',
  business_type text not null default '',
  city text not null default '',
  tone text not null default 'cercano',
  stripe_customer_id text unique,
  subscription_status text not null default 'none',
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

-- Cada vez que alguien genera textos, se guarda aquí (historial y límite de uso).
create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tool text not null default 'social',
  request text not null,
  result jsonb not null,
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  created_at timestamptz not null default now()
);

-- Por si ya ejecutaste una versión anterior de este archivo.
alter table public.generations add column if not exists tool text not null default 'social';

create index if not exists generations_user_created_idx
  on public.generations (user_id, created_at desc);

-- Crea el perfil automáticamente cuando alguien se registra.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seguridad: cada cliente solo ve y cambia lo suyo.
alter table public.profiles enable row level security;
alter table public.generations enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "generations_select_own" on public.generations;
create policy "generations_select_own" on public.generations
  for select using (auth.uid() = user_id);

-- Los clientes solo pueden cambiar los datos de su negocio, nunca su suscripción.
-- Las generaciones las guarda solo el servidor (con la clave de servicio).
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (business_name, business_type, city, tone) on public.profiles to authenticated;
revoke insert, update, delete on public.generations from anon, authenticated;

-- Reserva de usos: impide saltarse el límite pulsando «Generar» muchas veces a la vez.
-- Cada uso se reserva (status 'pending') antes de llamar a la IA y se completa después.
alter table public.generations add column if not exists status text not null default 'done';
alter table public.generations alter column result set default '{}'::jsonb;
alter table public.generations alter column model set default '';

create or replace function public.reserve_generation(
  p_user uuid,
  p_tool text,
  p_request text,
  p_limit integer,
  p_since timestamptz
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  used integer;
  new_id uuid;
begin
  -- Una reserva a la vez por cliente.
  perform pg_advisory_xact_lock(hashtext(p_user::text));

  -- Libera reservas atascadas (por ejemplo, si el servidor se cayó mientras escribía la IA).
  delete from public.generations
  where user_id = p_user
    and status = 'pending'
    and created_at < now() - interval '10 minutes';

  select count(*) into used
  from public.generations
  where user_id = p_user
    and (p_since is null or created_at >= p_since);

  if used >= p_limit then
    return null;
  end if;

  insert into public.generations (user_id, tool, request, status)
  values (p_user, p_tool, p_request, 'pending')
  returning id into new_id;

  return new_id;
end;
$$;

-- Solo el servidor (clave de servicio) puede reservar usos.
revoke execute on function public.reserve_generation(uuid, text, text, integer, timestamptz) from public, anon, authenticated;
grant execute on function public.reserve_generation(uuid, text, text, integer, timestamptz) to service_role;

-- Opiniones de los clientes (se leen en /admin). Solo el servidor las guarda.
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  rating integer check (rating between 1 and 5),
  message text not null default '',
  created_at timestamptz not null default now()
);
alter table public.feedback enable row level security;
revoke all on public.feedback from anon, authenticated;

-- Plan contratado (basic = 9,99 €, pro = 30 €). Lo actualiza el webhook de Stripe.
alter table public.profiles add column if not exists plan text not null default 'basic';
