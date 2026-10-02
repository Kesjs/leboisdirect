alter table public.braviko_product_images
  add column if not exists watermarked_at timestamptz;

create index if not exists braviko_product_images_watermarked_idx
  on public.braviko_product_images (watermarked_at);
