drop table products, features, styles, skus, photos, related;

create table if not EXISTS products (
  id serial unique primary key not null,
  name varchar(80),
  slogan text,
  description text,
  category varchar(80),
  default_price decimal
  -- features jsonb
);

create index ix_products on products (id) using hash;

create table if not exists features (
  id serial primary key unique not null,
  product_id integer,
  feature varchar(80),
  value varchar(255),
  constraint fk_products
    foreign key(product_id)
      references products(id)
);

create index ix_features on features (product_id, id);

create table if not exists styles (
  style_id serial not null primary key,
  product_id integer,
  name text,
  sale_price text,
  original_price text,
  default_style boolean,
  constraint fk_products
    foreign key (product_id)
      references products(id)
);

create index ix_styles on styles (product_id) using hash;

create table if not exists skus (
  id serial primary key not null,
  styleId integer,
  size text,
  quantity integer,
    constraint fk_styles
      foreign key (styleId)
        references styles(style_id)
);

create index ix_skus on skus (styleId, id);

create table if not exists photos (
  id serial primary key not null,
  styleId integer,
  url text,
  thumbnail_url text,
  constraint fk_styles
    foreign key (styleId)
      references styles(style_id)
);

create index ix_photos on photos (styleId, id);

create table if not exists related (
  id serial primary key not null,
  current_product_id integer,
  related_product_id integer,
  constraint fk_products
    foreign key (current_product_id)
      references products(id)
);

create index ix_related on related (current_product_id, id);