-- Allow guest checkout orders without mandatory Supabase Auth account.
-- Authenticated orders still attach auth.uid() when logged in.

alter table public.braviko_orders
  alter column user_id drop not null;

create index if not exists braviko_orders_email_created_idx
  on public.braviko_orders(lower(customer_email), created_at desc);
