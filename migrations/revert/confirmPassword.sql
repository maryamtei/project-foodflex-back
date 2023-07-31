-- Revert foodflex:confirmPassword from pg

BEGIN;

ALTER TABLE "user"
DROP COLUMN "confirmPassword";

COMMIT;
