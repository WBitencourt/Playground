create database if not exists mydb_dockernode;

\c mydb_dockernode;

create table if not exists mytable_dockernode (
    id serial primary key,
    name varchar(100) not null,
    date timestamp not null default current_timestamp,
);

\l
\c mydb_dockernode;
\d mytable_dockernode;

