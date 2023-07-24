BEGIN;

-- Insertion dans la table "favorite"
INSERT INTO "favorite" ("idDbMeal", "user_id", "name", "image", "position")
VALUES ('42a', 1, 'test', 'chemin/vers/image.jpg', 1);

-- Insertion dans la table "schedule"
INSERT INTO "schedule" ("user_id", "week")
VALUES (1, 2);

-- Insertion dans la table "meal"
INSERT INTO "meal" ("idDbMeal", "schedule_id", "name", "image", "position")
VALUES ('42a', 1, 'Repas 1', 'chemin/vers/image_repas.jpg', 1);

ROLLBACK;



