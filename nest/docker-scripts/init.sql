-- CREATE DATABASE nestjs_docker;

\c nestjs_docker;

CREATE TABLE IF NOT EXISTS example (
    id serial primary key,
    name varchar(100) not null,
    date timestamp not null default current_timestamp
);
