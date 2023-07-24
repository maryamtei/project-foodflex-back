-- Verify foodflex:contact on pg

BEGIN;

SELECT * FROM "contact" WHERE false;

ROLLBACK;
