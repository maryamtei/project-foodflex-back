-- Deploy foodflex:authentification to pg

BEGIN;

/* Table: authToken */
CREATE TABLE IF NOT EXISTS "authTokens" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL REFERENCES "user"("id"),
  "token" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NULL DEFAULT NOW()
);

COMMIT;
