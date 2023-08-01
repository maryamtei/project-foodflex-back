-- Verify foodflex:contact on pg
-- Comment: This is a comment indicating the verification of the "contact" table in the PostgreSQL database.

BEGIN;
-- Comment: Start a transaction to ensure the integrity of the operations.

SELECT * FROM "contact" WHERE false;
-- Comment: This SELECT query is used to verify the existence of the "contact" table in the database.
-- However, by using "WHERE false", the query will not return any rows, ensuring that no actual data is retrieved.

ROLLBACK;
-- Comment: Rollback the transaction without making any changes to the database.
-- This effectively cancels the previous SELECT query and any other operations within the transaction.
-- The purpose of this block may be for checking the existence of the table without affecting the data.
-- If the table doesn't exist, the transaction will be rolled back, leaving the database unchanged.
