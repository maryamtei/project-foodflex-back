-- Verify foodflex:authentification on pg

BEGIN;

SELECT * FROM "authTokens" WHERE false;

ROLLBACK;
