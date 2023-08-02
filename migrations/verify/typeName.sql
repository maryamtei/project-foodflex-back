-- Verify foodflex:typeName on pg

BEGIN;

INSERT INTO "user" ("firstName", "lastName", "email", "password", "role_id")
VALUES ('John', 'Doe', 'john.doe@example.com', 'hashed_password', 1);

INSERT INTO "favorite" ("idDbMeal", "user_id", "name", "image", "position")
VALUES ('42a',(SELECT "id" FROM "user" WHERE "email" = 'john.doe@example.com'), 'test', 'chemin/vers/image.jpg', 1);

ROLLBACK;
