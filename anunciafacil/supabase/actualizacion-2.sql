-- Actualización 2 de Pregonia (columna del plan contratado).
-- Pégalo en Supabase → SQL Editor → Run. Si ejecutas schema.sql completo por primera vez, no hace falta.
-- Plan contratado: basic, pro o premium. Lo actualiza el webhook de Stripe.
alter table public.profiles add column if not exists plan text not null default 'basic';
