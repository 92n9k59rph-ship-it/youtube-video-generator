-- Actualización 1 de AnunciaFácil (reserva de usos).
-- Si ya ejecutaste schema.sql antes del 30 de octubre, pega esto en Supabase → SQL Editor → Run.
-- Si ejecutas schema.sql completo por primera vez, no hace falta: ya lo incluye.
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
