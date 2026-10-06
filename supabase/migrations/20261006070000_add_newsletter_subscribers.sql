create table if not exists public.braviko_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  locale text not null check (locale in ('fr', 'de', 'it')),
  source text not null default 'footer',
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create unique index if not exists braviko_newsletter_subscribers_email_key on public.braviko_newsletter_subscribers (lower(email));

alter table public.braviko_newsletter_subscribers enable row level security;

drop policy if exists "Anyone can subscribe to newsletter" on public.braviko_newsletter_subscribers;
create policy "Anyone can subscribe to newsletter"
  on public.braviko_newsletter_subscribers
  for insert
  to anon, authenticated
  with check (locale in ('fr', 'de', 'it') and source = 'footer');

revoke all on public.braviko_newsletter_subscribers from anon, authenticated;
grant insert on public.braviko_newsletter_subscribers to anon, authenticated;
