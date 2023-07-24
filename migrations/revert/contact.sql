-- Revert foodflex:contact from pg

BEGIN;

DROP TABLE "contact";

COMMIT;
