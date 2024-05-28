-- list all databases
\l;

-- connect database
\c nestjs_docker; 

-- describe table
\d example; 

--DELETE FROM example;

INSERT INTO example (name) VALUES ('check.sql test');

SELECT * FROM example;

-- Run this script in terminal with the following command:
-- docker compose exec postgres sh
-- psql -U username -d nestjs_docker -f /scripts/check.sql