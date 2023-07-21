-- Deploy foodflex:typeName to pg

BEGIN;

ALTER TABLE "favorite"
  ALTER COLUMN "name" TYPE TEXT;

COMMIT;
