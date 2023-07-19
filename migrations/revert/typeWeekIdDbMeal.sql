-- Revert foodflex:typeWeekIdDbMeal from pg

BEGIN;

ALTER TABLE "schedule"
  ALTER COLUMN "week" TYPE TEXT;

ALTER TABLE "favorite"
  ALTER COLUMN "idDbMeal" TYPE INT;

ALTER TABLE "meal"
  ALTER COLUMN "idDbMeal" TYPE INT;

COMMIT;
