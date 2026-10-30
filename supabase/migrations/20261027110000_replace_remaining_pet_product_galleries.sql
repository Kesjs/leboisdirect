-- Replace the remaining pet galleries that contained generated, mismatched,
-- marketplace or low-confidence images with product-specific source images.
-- Prices, variants, stock and product records are intentionally untouched.

with updates(slug, sort_order, storage_path, alt_text) as (
  values
    ('animali-6-rinti-max-i-mum-manzo-2-x-12-kg', 1, 'https://wsrv.nl/?url=https%3A%2F%2Frinti.shop%2Fimages%2Fproduct_images%2Fpopup_images%2F4000158911810.jpg&w=1200&output=webp&q=85', 'Foto prodotto — RINTI Max-i-Mum Manzo 2 × 12 kg'),
    ('animali-6-rinti-max-i-mum-manzo-2-x-12-kg', 2, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.os.fressnapf.com%2Fproducts-v2%2F8%2Fd%2Fb%2F1%2F8db19b3117af4e4269963fbc533ebadf3e95e979_1311068_0.png%3Ft%3Dprod_l&w=1200&output=webp&q=85', 'Foto prodotto — RINTI Max-i-Mum Manzo 2 × 12 kg'),
    ('animali-6-rinti-max-i-mum-manzo-2-x-12-kg', 3, 'https://wsrv.nl/?url=https%3A%2F%2Fcdn.billiger.com%2Fdynimg%2FOmk13vqzRXeof0p75-xL_Sy06_TI1CsUahE8nUhH7Pc88MgR1b3VHcWvS03VxtgwPIhBb_hvIJH2uSYR3mvygh6HFVM7Iw7-otgyQZD15rp%2FRinti-Max-i-Mum-Rind-2-x-12-kg.webp%3Fh%3D630%26w%3D1200&w=1200&output=webp&q=85', 'Foto prodotto — RINTI Max-i-Mum Manzo 2 × 12 kg'),

    ('animali-7-royal-canin-maxi-adult-2-x-15-kg', 1, 'https://wsrv.nl/?url=https%3A%2F%2Fcdn.competec.ch%2Fimages2%2F1%2F9%2F3%2F268467391%2F268467391_xxl.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Royal Canin Maxi Adult 2 × 15 kg'),
    ('animali-7-royal-canin-maxi-adult-2-x-15-kg', 2, 'https://wsrv.nl/?url=https%3A%2F%2Fd3gsrlzbn502xa.cloudfront.net%2Fmedia%2FFiles%2FthumPro%2F637967683925430889.jpg%3Fwidth%3D400&w=1200&output=webp&q=85', 'Foto prodotto — Royal Canin Maxi Adult 2 × 15 kg'),
    ('animali-7-royal-canin-maxi-adult-2-x-15-kg', 3, 'https://wsrv.nl/?url=https%3A%2F%2Fwww.zoki-zoo.ru%2Fthumb%2F2%2Fm9mgP6npdOzn49HlpERHtw%2Fr%2Fd%2Frk_maksi_0.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Royal Canin Maxi Adult 2 × 15 kg'),

    ('animali-8-royal-canin-medium-adult-2-x-15-kg', 1, 'https://wsrv.nl/?url=https%3A%2F%2Fimage.ceneostatic.pl%2Fdata%2Fproducts%2F60247639%2Fi-royal-canin-medium-adult-15-kg.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Royal Canin Medium Adult 2 × 15 kg'),
    ('animali-8-royal-canin-medium-adult-2-x-15-kg', 2, 'https://wsrv.nl/?url=https%3A%2F%2Fstatic.m79.lv%2Fprod_img2%2F010818l3l0f0o7f8t7a2t5u8k869354l36.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Royal Canin Medium Adult 2 × 15 kg'),
    ('animali-8-royal-canin-medium-adult-2-x-15-kg', 3, 'https://wsrv.nl/?url=https%3A%2F%2Finwfile.com%2Fs-fl%2F1dvsmi.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Royal Canin Medium Adult 2 × 15 kg'),

    ('animali-25-cat-s-flower-xxl-creme-h-183-cm', 1, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F2%2F800%2F65238_kratzbaum_cat_flower_xxl_fg_2_2.jpg%3Fwidth%3D400%26format%3Dwebp&w=1200&output=webp&q=85', 'Foto prodotto — Cat''s Flower XXL crème, H 183 cm'),
    ('animali-25-cat-s-flower-xxl-creme-h-183-cm', 2, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F5%2F800%2F65238_kratzbaum_cat_flower_xxl_fg_19_5.jpg%3Fwidth%3D400%26format%3Dwebp&w=1200&output=webp&q=85', 'Foto prodotto — Cat''s Flower XXL crème, H 183 cm'),
    ('animali-25-cat-s-flower-xxl-creme-h-183-cm', 3, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F3%2F800%2F65238_kratzbaum_cat_flower_xxl_fg_16_3.jpg%3Fwidth%3D400%26format%3Dwebp&w=1200&output=webp&q=85', 'Foto prodotto — Cat''s Flower XXL crème, H 183 cm'),

    ('animali-33-ferplast-memor-one-xl', 1, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F0%2F800%2F574111_574112_574797_pla_ferplast_komfortbett_memor_one_hs_01_0.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Ferplast Memor-One XL'),
    ('animali-33-ferplast-memor-one-xl', 2, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F5%2F800%2F574111_574112_574797_ferplast_komfortbett_memor_one_hs_05_5.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Ferplast Memor-One XL'),
    ('animali-33-ferplast-memor-one-xl', 3, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F8%2F800%2F574111_574112_574797_ferplast_komfortbett_memor_one_hs_03_8.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Ferplast Memor-One XL'),

    ('animali-34-more-cuccia-memory-ortopedica-simplicity', 1, 'https://wsrv.nl/?url=https%3A%2F%2Farcaplanet.vtexassets.com%2Farquivos%2Fids%2F284325%2F4d7a8996871a21b82cc63cd99228d1cad252eacb_0560f07facafe47f941e183fcf612d889360e569.jpg%3Fv%3D638176788818700000&w=1200&output=webp&q=85', 'Foto prodotto — More Cuccia Memory Ortopedica Simplicity Tortora XL'),
    ('animali-34-more-cuccia-memory-ortopedica-simplicity', 2, 'https://wsrv.nl/?url=https%3A%2F%2Farcaplanet.vteximg.com.br%2Farquivos%2Fids%2F317892%2Fmore-cuccia-rettangolare-simplicity-grigio-talpa-10154286.jpg.jpg%3Fv%3D638765924727700000&w=1200&output=webp&q=85', 'Vue alternative du modèle — More Cuccia Memory Ortopedica Simplicity Tortora'),
    ('animali-34-more-cuccia-memory-ortopedica-simplicity', 3, 'https://wsrv.nl/?url=https%3A%2F%2Farcaplanet.vteximg.com.br%2Farquivos%2Fids%2F317889%2Fmore-cuccia-simplicity-grigia-10153654--2-.jpg.jpg%3Fv%3D638905147964900000&w=1200&output=webp&q=85', 'Vue alternative de la gamme — More Cuccia Memory Ortopedica Simplicity'),

    ('animali-46-modern-living-halmstad-l', 1, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F1%2F800%2F478021_ml_indoor_crate_halmstad_fg_3489_1.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Modern Living Halmstad L'),
    ('animali-46-modern-living-halmstad-l', 2, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F0%2F800%2F478021_ml_indoor_crate_halmstad_fg_3496_0.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Modern Living Halmstad L'),
    ('animali-46-modern-living-halmstad-l', 3, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F3%2F800%2F478021_ml_indoor_crate_halmstad_fg_3509_3.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Modern Living Halmstad L'),

    ('animali-54-kerbl-pet-vacation-gabbia-aluminium-auto-77-cm', 1, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F6%2F800%2F610799_kerbl_pet_transportbox_vacation_aus_alu_graphite_77x55x50cm_hs_03_6.jpg%3Fwidth%3D400%26format%3Dwebp&w=1200&output=webp&q=85', 'Foto prodotto — Kerbl Pet Vacation gabbia aluminium auto 77 cm'),
    ('animali-54-kerbl-pet-vacation-gabbia-aluminium-auto-77-cm', 2, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F7%2F800%2F610799_pla_kerbl_pet_transportbox_vacation_aus_alu__graphite_77x55x50cm_hs_01_7.jpg%3Fwidth%3D400%26format%3Dwebp&w=1200&output=webp&q=85', 'Foto prodotto — Kerbl Pet Vacation gabbia aluminium auto 77 cm'),
    ('animali-54-kerbl-pet-vacation-gabbia-aluminium-auto-77-cm', 3, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F4%2F800%2F610799_kerbl_pet_transportbox_vacation_aus_alu_graphite_77x55x50cm_hs_02_4.jpg%3Fwidth%3D400%26format%3Dwebp&w=1200&output=webp&q=85', 'Foto prodotto — Kerbl Pet Vacation gabbia aluminium auto 77 cm'),

    ('animali-59-nomad-tales-calma-poussette-premium-jusqu-a-15-kg', 1, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F8%2F800%2F62737_01_nt_pet_stroller_mhtb2202_1000x_8.jpg&w=1200&output=webp&q=85', 'Foto prodotto — Nomad Tales Calma poussette premium jusqu''à 15 kg'),
    ('animali-59-nomad-tales-calma-poussette-premium-jusqu-a-15-kg', 2, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F0%2F800%2F62737_12_nt_pet_stroller_mhtb2202_1000x_0.jpg%3Fwidth%3D400%26format%3Dwebp&w=1200&output=webp&q=85', 'Foto prodotto — Nomad Tales Calma poussette premium jusqu''à 15 kg'),
    ('animali-59-nomad-tales-calma-poussette-premium-jusqu-a-15-kg', 3, 'https://wsrv.nl/?url=https%3A%2F%2Fmedia.zooplus.com%2Fbilder%2F4%2F800%2F62737_02_nt_pet_stroller_mhtb2202_1000x_4.jpg%3Fwidth%3D400%26format%3Dwebp&w=1200&output=webp&q=85', 'Foto prodotto — Nomad Tales Calma poussette premium jusqu''à 15 kg')
)
update public.braviko_product_images as i
set storage_path = u.storage_path,
    alt_text = u.alt_text,
    watermarked_at = null,
    is_primary = (u.sort_order = 1)
from updates as u
join public.braviko_products as p on p.slug = u.slug
where i.product_id = p.id
  and i.sort_order = u.sort_order;
