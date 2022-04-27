create table clients (
  cnpj varchar(50) primary key,
  name varchar(70) not null,
  trademark varchar(70) not null,
  email varchar(50),
  phone varchar(50),
  is_active boolean default true,
  created_at timestamp default now()
);