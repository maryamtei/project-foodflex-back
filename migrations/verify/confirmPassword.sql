--Verify foodflex:confirmPassword on pg

BEGIN;

SELECT * FROM "user" WHERE false;

ROLLBACK;
