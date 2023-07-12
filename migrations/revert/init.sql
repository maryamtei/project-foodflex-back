-- Revert foodflex:init from pg

BEGIN;

DROP TABLE
  "user"
  "role";
  "favori",
  "scheduling",
  "meal",

DROP DOMAIN
  "rfc_email";

COMMIT;
