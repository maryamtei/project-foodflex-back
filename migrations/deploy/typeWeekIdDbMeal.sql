-- Deploy foodflex:typeWeekIdDbMeal to pg

BEGIN;

ALTER TABLE "schedule"
  ALTER COLUMN "week" TYPE INT USING week::integer;

ALTER TABLE "favorite"
  ALTER COLUMN "idDbMeal" TYPE TEXT USING "idDbMeal"::text;

ALTER TABLE "meal"
  ALTER COLUMN "idDbMeal" TYPE TEXT USING "idDbMeal"::text;

COMMIT;
