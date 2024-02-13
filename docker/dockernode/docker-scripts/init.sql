CREATE DATABASE mydb_dockernode;

\c mydb_dockernode;

CREATE TABLE IF NOT EXISTS mytable_dockernode (
    id serial primary key,
    name varchar(100) not null,
    date timestamp not null default current_timestamp
);
