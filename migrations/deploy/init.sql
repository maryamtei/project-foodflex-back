-- Deploy foodflex:init to pg (first deploy)
BEGIN;
CREATE DOMAIN rfc_email AS text CHECK (
  value ~ '^(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$'
);
/* Table: role */
CREATE TABLE IF NOT EXISTS "role" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" varchar(30) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NULL DEFAULT NOW()
);
/* Table: user */
CREATE TABLE IF NOT EXISTS "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstName" varchar(64) NOT NULL,
  "lastName" varchar(64) NOT NULL,
  "email" rfc_email NOT NULL UNIQUE,
  "password" varchar(64) NOT NULL,
  "role_id" int NOT NULL REFERENCES "role"("id"),
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NULL DEFAULT NOW()
);
/* Table: favori */
CREATE TABLE IF NOT EXISTS "favorite" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "idDbMeal" int NOT NULL,
  "user_id" int NOT NULL REFERENCES "user"("id"),
  "name" varchar(30) NOT NULL, /* plus de 30 char */
  "image" text NOT NULL,
  "position" int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NULL DEFAULT NOW()
);
/* Table: scheduling */
CREATE TABLE IF NOT EXISTS "schedule" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL REFERENCES "user"("id"),
  "week" int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NULL DEFAULT NOW()
);
/* Table: meal */
CREATE TABLE IF NOT EXISTS "meal" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "idDbMeal" int NOT NULL,
  "schedule_id" int NOT NULL REFERENCES "schedule"("id"),
  "name" text NOT NULL,
  "image" text NOT NULL,
  "position" int NOT NULL,
  CHECK ("position" <= 13),
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NULL DEFAULT NOW()
);
-- /* Table: authToken */
-- CREATE TABLE IF NOT EXISTS "authTokens" (
--   "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   "user_id" int NOT NULL REFERENCES "user"("id"),
--   "token" text NOT NULL,
--   "created_at" timestamptz NOT NULL DEFAULT NOW(),
--   "updated_at" timestamptz NULL DEFAULT NOW()
-- );
COMMIT;