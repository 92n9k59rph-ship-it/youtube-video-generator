-- Actualización 2 de Anuncio Fácil (plan Pro de 30 €).
-- Pégalo en Supabase → SQL Editor → Run. Si ejecutas schema.sql completo por primera vez, no hace falta.
-- Plan contratado (basic = 9,99 €, pro = 30 €). Lo actualiza el webhook de Stripe.
alter table public.profiles add column if not exists plan text not null default 'basic';
