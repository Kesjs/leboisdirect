alter table public.braviko_categories
  add column if not exists parent_id uuid references public.braviko_categories(id) on delete set null;

create index if not exists braviko_categories_parent_id_idx
  on public.braviko_categories(parent_id);
