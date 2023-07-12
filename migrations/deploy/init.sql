-- Deploy foodflex:init to pg

BEGIN;

CREATE DOMAIN rfc_email AS text
CHECK (value ~ '^(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$');

DROP TABLE IF EXISTS "user","role","favori","scheduling","meal";

/* Table: user */
CREATE TABLE IF NOT EXISTS "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" varchar(64) NOT NULL,
  "lastname" varchar(64) NOT NULL,
  "email" rfc_email NOT NULL UNIQUE,
  "password" varchar(64) NOT NULL,
  "cree_le" timestamptz NOT NULL DEFAULT NOW(),
  "modifie_le" timestamptz NULL DEFAULT NOW()
);

/* Table: role */
CREATE TABLE IF NOT EXISTS "role" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" varchar(30) NOT NULL,
  "cree_le" timestamptz NOT NULL DEFAULT NOW(),
  "modifie_le" timestamptz NULL DEFAULT NOW()
);

/* Table: favori */
CREATE TABLE IF NOT EXISTS "favori" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "idDbMeal" int NOT NULL,
  "user_id" int NOT NULL REFERENCES "user"("id"),
  "name" varchar(30) NOT NULL,
  "image" text NOT NULL,
  "position" int NOT NULL,
  "cree_le" timestamptz NOT NULL DEFAULT NOW(),
  "modifie_le" timestamptz NULL DEFAULT NOW()
);

/* Table: scheduling */
CREATE TABLE IF NOT EXISTS "scheduling" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL REFERENCES "user"("id"),
  "week" varchar(30) NOT NULL,
  "cree_le" timestamptz NOT NULL DEFAULT NOW(),
  "modifie_le" timestamptz NULL DEFAULT NOW()
);

/* Table: meal */
CREATE TABLE IF NOT EXISTS "meal" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "idDbMeal" int NOT NULL,
  "scheduling_id" int NOT NULL REFERENCES "scheduling"("id"),
  "name" text NOT NULL,
  "image" text NOT NULL,
  "position" int NOT NULL, CHECK ("position" <= 14),
  "cree_le" timestamptz NOT NULL DEFAULT NOW(),
  "modifie_le" timestamptz NULL DEFAULT NOW()
);

COMMIT;

