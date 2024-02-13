
-- list all databases
\l;

-- connect to mydb_dockernode
\c mydb_dockernode; 

-- describe mytable_dockernode
\d mytable_dockernode; 

--DELETE FROM mytable_dockernode;

INSERT INTO mytable_dockernode (name) VALUES ('test');

SELECT * FROM mytable_dockernode;

-- Run this script in terminal with the following command:
-- docker-compose exec postgres psql -U postgres -f /scripts/check.sql