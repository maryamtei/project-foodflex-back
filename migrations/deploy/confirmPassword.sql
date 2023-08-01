-- Deploy foodflex:confirmPassword to pg

BEGIN;

ALTER TABLE "user"
    ADD "confirmPassword" varchar(64) NOT NULL;

COMMIT;
