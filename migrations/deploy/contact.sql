-- Deploy foodflex:contact to pg
-- Comment: This is a comment indicating the deployment of the "contact" table to the PostgreSQL database.


BEGIN;
-- Comment: Start a transaction to ensure the integrity of the operations.

CREATE TABLE IF NOT EXISTS "contact" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" varchar(30) NOT NULL,
    "email" rfc_email NOT NULL UNIQUE,
    "message" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz NULL DEFAULT NOW()
);

-- Comment: This command creates the "contact" table in the PostgreSQL database.
-- The "id" field is a primary key that is automatically generated and increments with each new record.
-- The "name" field is a string with a maximum length of 30 characters, and it is required (NOT NULL).
-- The "email" field is of type rfc_email and must be unique and required (NOT NULL).
-- The "message" field is a text field and is required (NOT NULL).
-- The "created_at" field is of type timestamptz (timestamp with time zone) and is required (NOT NULL) with a default value of the current date and time (NOW()).
-- The "updated_at" field is of type timestamptz (timestamp with time zone) and can be null (NULL) with a default value of the current date and time (NOW()).

COMMIT;
-- Comment: Commit and end the transaction, saving the changes to the database.

