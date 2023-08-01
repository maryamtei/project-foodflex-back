-- Revert foodflex:contact from pg
-- Comment: This is a comment indicating the reversal of the "contact" table from the PostgreSQL database.

BEGIN;
-- Comment: Start a transaction to ensure the integrity of the operations.

DROP TABLE "contact";
-- Comment: This command drops the "contact" table from the PostgreSQL database.
-- It permanently deletes the table and all its data.

COMMIT;
-- Comment: Commit and end the transaction, saving the changes to the database.