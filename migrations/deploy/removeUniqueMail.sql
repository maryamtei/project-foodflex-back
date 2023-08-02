-- Deploy foodflex:removeUniqueMail to pg

BEGIN;

ALTER TABLE "contact" DROP CONSTRAINT IF EXISTS "contact_email_key";

COMMIT;

