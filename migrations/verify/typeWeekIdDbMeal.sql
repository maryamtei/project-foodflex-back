BEGIN;

INSERT INTO "user" ("firstName", "lastName", "email", "password", "role_id")
VALUES ('John', 'Doe', 'john.doe@example.com', 'hashed_password', 1);

-- Insertion dans la table "favorite"
INSERT INTO "favorite" ("idDbMeal", "user_id", "name", "image", "position")
VALUES ('42a', (SELECT "id" FROM "user" WHERE "email" = 'john.doe@example.com'), 'test', 'chemin/vers/image.jpg', 1);

-- Insertion dans la table "schedule"
INSERT INTO "schedule" ("user_id", "week")
VALUES ((SELECT "id" FROM "user" WHERE "email" = 'john.doe@example.com'), 2);

-- Insertion dans la table "meal"
INSERT INTO "meal" ("idDbMeal", "schedule_id", "name", "image", "position")
VALUES ('42a', (SELECT "id" FROM "schedule" WHERE "week" = 2), 'Repas 1', 'chemin/vers/image_repas.jpg', 1);

ROLLBACK;



