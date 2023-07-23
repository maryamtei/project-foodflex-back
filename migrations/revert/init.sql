-- Revert foodflex:init from pg
BEGIN;
DROP TABLE
"role",
"user",
"favorite",
"schedule",
"meal";
DROP DOMAIN IF EXISTS rfc_email;
COMMIT;
