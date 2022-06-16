create table products (
  id serial primary key,
  name varchar(200) not null,
  description varchar(500) not null,
  price numeric not null,
  img_url varchar(500),
  is_active boolean default true,
  created_at timestamp default now()
);