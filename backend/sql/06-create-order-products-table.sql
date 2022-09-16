create table orders (
  id serial primary key,
  cnpj varchar(14) not null,
  name varchar(80) not null,
  status varchar(200) not null,
  amount numeric not null,
  created_at timestamp default now(),
  created_by varchar(50) not null,
  updated_at timestamp,
  constraint fk_cnpj foreign key(cnpj) references clients(cnpj),
  constraint fk_created_by foreign key(created_by) references users(email)
);

create table order_products (
  order_id int not null,
  product_id int not null,
  product_qty int not null,
  product_value numeric not null,
  primary key(order_id, product_id),
  constraint fk_order_id foreign key(order_id) references orders(id),
  constraint fk_product_id foreign key(product_id) references products(id)
);