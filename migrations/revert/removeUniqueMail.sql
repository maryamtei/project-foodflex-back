-- -- Revert foodflex:removeUniqueMail from pg

-- BEGIN;

-- ALTER TABLE "contact" ADD CONSTRAINT "contact_email_key" UNIQUE ("email");

-- COMMIT;
