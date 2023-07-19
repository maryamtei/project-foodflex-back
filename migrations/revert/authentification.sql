-- Revert foodflex:authentification from pg

BEGIN;

DROP TABLE "authTokens";

COMMIT;
