
-- list all databases
\l;

-- connect database
\c playground_docker; 

-- describe table
\d example; 

--DELETE FROM example;

INSERT INTO example (name) VALUES ('test');

SELECT * FROM example;

-- Run this script in terminal with the following command:
-- docker compose exec postgres psql -U username -d playground_docker -f /scripts/check.sql