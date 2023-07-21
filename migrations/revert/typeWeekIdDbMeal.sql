-- Revert foodflex:typeWeekIdDbMeal from pg

BEGIN;

ALTER TABLE "meal"
  ALTER COLUMN "idDbMeal" TYPE TEXT;

ALTER TABLE "favorite"
  ALTER COLUMN "idDbMeal" TYPE TEXT;

ALTER TABLE "schedule"
  ALTER COLUMN "week" TYPE INT USING "week"::INT;

COMMIT;
