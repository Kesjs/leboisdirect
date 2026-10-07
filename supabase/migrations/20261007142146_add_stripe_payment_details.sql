alter table public.braviko_orders
  add column if not exists stripe_session_id text,
  add column if not exists stripe_payment_intent_id text,
  add column if not exists payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'pending', 'paid', 'failed', 'refunded')),
  add column if not exists payment_method text,
  add column if not exists paid_at timestamptz;

create unique index if not exists braviko_orders_stripe_session_idx
  on public.braviko_orders(stripe_session_id)
  where stripe_session_id is not null;

grant select on public.braviko_orders to authenticated;
