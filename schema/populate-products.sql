COPY products
FROM '/home/ivan/galvanize/sdc/SDC/csv/product.csv'
DELIMITER ',' CSV HEADER;

COPY features
FROM '/home/ivan/galvanize/sdc/SDC/csv/features.csv'
DELIMITER ',' CSV HEADER;

COPY styles
FROM '/home/ivan/galvanize/sdc/SDC/csv/styles.csv'
DELIMITER ',' CSV HEADER;

COPY skus
FROM '/home/ivan/galvanize/sdc/SDC/csv/skus.csv'
DELIMITER ',' CSV HEADER;

COPY photos
FROM '/home/ivan/galvanize/sdc/SDC/csv/photos.csv'
DELIMITER ',' CSV HEADER;

COPY related
FROM '/home/ivan/galvanize/sdc/SDC/csv/related.csv'
DELIMITER ',' CSV HEADER;

create table features_optimized as
select products.id,
       (jsonb_agg(to_jsonb(features) - 'product_id' - 'id')) as features
from products
left join features on (products.id = features.product_id)
group by products.id;

drop table features;

create index ix_features_optimized on features_optimized (id) using hash;

create table related_optimized as
select related.current_product_id,
       (jsonb_agg(to_jsonb(related) - 'id' - 'current_product_id')) as related
from products
left join related on (products.id = related.current_product_id)
group by related.current_product_id;

create index related_optimized on related_optimized (id) using hash;

create table photos_optimized as
select s.style_id,
       (jsonb_agg(to_jsonb(p) - 'id')) as photos
from styles as s
left join photos as p on (s.style_id = p.styleId)
group by s.style_id;

drop table photos;

create index ix_photos_optimized on photos_optimized (id) using hash;

create table skus_optimized as
select s.style_id,
       (jsonb_agg(to_jsonb(sk) - 'id')) as skus
from styles as s
left join skus as sk on (s.style_id = sk.styleId)
group by s.style_id;

drop table skus;

create index ix_skus_optimized on skus_optimized (style_id) using hash;