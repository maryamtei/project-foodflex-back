-- Revert foodflex:typeName from pg

BEGIN;

ALTER TABLE "favorite"
  ALTER COLUMN "name" TYPE VARCHAR;

COMMIT;
