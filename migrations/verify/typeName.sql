-- Verify foodflex:typeName on pg

BEGIN;

-- Insertion dans la table "favorite"
INSERT INTO "favorite" ("idDbMeal", "user_id", "name", "image", "position")
VALUES ('42a', 1, 'test', 'chemin/vers/image.jpg', 1);

ROLLBACK;
