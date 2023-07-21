-- Verify foodflex:init on pg

BEGIN;

SELECT * FROM "role" WHERE false;
SELECT * FROM "user" WHERE false;
SELECT * FROM "favorite" WHERE false;
SELECT * FROM "schedule" WHERE false;
SELECT * FROM "meal" WHERE false;

ROLLBACK;
