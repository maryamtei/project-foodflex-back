-- Revert foodflex:init from pg
BEGIN;
DROP TABLE "user",
"role",
"favorite",
"schedule",
"meal",
DROP DOMAIN "rfc_email";
COMMIT;