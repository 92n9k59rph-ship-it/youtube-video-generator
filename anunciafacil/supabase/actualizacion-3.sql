-- Actualización 3 de Tendalia: «Datos útiles» del negocio (horario, cómo reservar, especialidades...).
-- Pégalo en Supabase → SQL Editor → Run. Si ejecutas schema.sql completo por primera vez, no hace falta.
alter table public.profiles add column if not exists details text not null default '';
