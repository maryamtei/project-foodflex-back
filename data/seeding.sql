-- Table: user
INSERT INTO "user" ("firstname", "lastname", "email", "password") VALUES
  ('John', 'Doe', 'john@example.com', 'password123'),
  ('Jane', 'Smith', 'jane@example.com', 'password456');

-- Table: role
INSERT INTO "role" ("name") VALUES
  ('Admin'),
  ('User');

-- Table: favori
INSERT INTO "favori" ("idDbMeal", "user_id", "name", "image", "position") VALUES
  (1, 1, 'Meal 1', 'https:\/\/www.themealdb.com\/images\/media\/meals\/ustsqw1468250014.jpg', 1),
  (2, 1, 'Meal 2', 'https:\/\/www.themealdb.com\/images\/media\/meals\/ustsqw1468250014.jpg', 2),
  (3, 2, 'Meal 3', 'https:\/\/www.themealdb.com\/images\/media\/meals\/ustsqw1468250014.jpg', 1);

-- Table: scheduling
INSERT INTO "scheduling" ("user_id", "week") VALUES
  (1, 'Week 1'),
  (1, 'Week 2'),
  (2, 'Week 1');

-- Table: meal
INSERT INTO "meal" ("idDbMeal", "scheduling_id", "name", "image", "position") VALUES
  (1, 1, 'Meal 1', 'https:\/\/www.themealdb.com\/images\/media\/meals\/xvsurr1511719182.jpg', 1),
  (2, 1, 'Meal 2', 'https:\/\/www.themealdb.com\/images\/media\/meals\/xvsurr1511719182.jpg', 2),
  (3, 2, 'Meal 3', 'https:\/\/www.themealdb.com\/images\/media\/meals\/xvsurr1511719182.jpg', 1);