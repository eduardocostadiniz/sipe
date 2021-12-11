create table users (
  email varchar(50) primary key,
  name varchar(70) not null,
  password varchar(100) not null,
  avatar varchar(100),
  profile varchar(30) not null,
  client_cnpj varchar(14),
  is_active boolean default true,
  created_at timestamp default now()
);