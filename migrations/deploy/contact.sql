-- Deploy foodflex:contact to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "contact" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" varchar(30) NOT NULL,
    "email" rfc_email NOT NULL UNIQUE,
    "message" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz NULL DEFAULT NOW()
);

COMMIT;
