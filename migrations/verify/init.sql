-- Verify foodflex:init on pg

BEGIN;

SELECT * FROM "user" WHERE false;
SELECT * FROM "role" WHERE false;
SELECT * FROM "favori" WHERE false;
SELECT * FROM "scheduling" WHERE false;
SELECT * FROM "meal" WHERE false;

ROLLBACK;
