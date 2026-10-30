-- AnunciaFácil: tablas y permisos. Pégalo entero en Supabase → SQL Editor → Run.

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
  request text not null,
  result jsonb not null,
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  created_at timestamptz not null default now()
);

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
