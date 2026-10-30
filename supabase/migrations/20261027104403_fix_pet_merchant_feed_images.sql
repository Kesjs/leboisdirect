-- Keep the pet storefront galleries compliant with the published product data.
-- The first image is the Merchant Center image; all three images must remain
-- specific to the same product and pack configuration.

update public.braviko_product_images as image
set
  storage_path = 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F0%2F800%2F217882_ferplast_transportbox_superior_hs_12_0.jpg&w=1200&output=webp&q=85',
  alt_text = 'Ferplast Superior L — vue supplémentaire du box pliable',
  watermarked_at = null
from public.braviko_products as product
where image.product_id = product.id
  and product.slug = 'animali-41-trasportino-ferplast-superior-l'
  and image.sort_order = 3;

update public.braviko_product_images as image
set
  storage_path = case image.sort_order
    when 1 then 'https://wsrv.nl/?url=https%3A%2F%2Fcdnpublic.budgetpetproducts.com.au%2Fproducts_pictures%2F2023%2F08%2F24%2F184b1615-1827-4b7a-949b-c8ebe9f69d96.jpg&w=1200&output=webp&q=85'
    when 2 then 'https://wsrv.nl/?url=https%3A%2F%2Fzooart.fr%2Fhpeciai%2F5d4dd91b81c6b106555143b70399941a%2Ffre_pl_ROYAL-CANIN-Maxi-Adult-2x15kg-37192_7.webp&w=1200&output=webp&q=85'
    when 3 then 'https://wsrv.nl/?url=https%3A%2F%2Fshopanddispatch.com%2Fcdn%2Fshop%2Ffiles%2FRoyalCaninMaxiBreedAdultDogFood15kgx211.png%3Fv%3D1706595176%26width%3D1946&w=1200&output=webp&q=85'
  end,
  alt_text = case image.sort_order
    when 1 then 'Royal Canin Maxi Adult — pack 2 × 15 kg, vue principale'
    when 2 then 'Royal Canin Maxi Adult — pack 2 × 15 kg, vue secondaire'
    when 3 then 'Royal Canin Maxi Adult — pack 2 × 15 kg, vue supplémentaire'
  end,
  watermarked_at = null
from public.braviko_products as product
where image.product_id = product.id
  and product.slug = 'animali-7-royal-canin-maxi-adult-2-x-15-kg'
  and image.sort_order in (1, 2, 3);
