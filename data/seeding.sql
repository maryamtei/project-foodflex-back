-- Table: role
INSERT INTO "role" ("name")
VALUES ('Admin'),
  ('User');
-- Table: user
INSERT INTO "user" (
    "firstName",
    "lastName",
    "email",
    "password",
    "role_id"
  )
VALUES (
    'John',
    'Doe',
    'john@example.com',
    'password123',
    2
  ),
  (
    'Jane',
    'Smith',
    'jane@example.com',
    'password456',
    2
  ),
  (
    'Romain',
    'Vicidomini',
    'r.vicidomini@foodflex.com',
    'foodflex',
    2
  ),
  (
    'Gabrielle',
    'Pagnard',
    'g.pagnard@foodflex.com',
    'foodflex',
    2
  ),
  (
    'Maryam',
    'Tei',
    'm.tei@foodflex.com',
    'foodflex',
    2
  ),
  (
    'Mathilde',
    'Louradour',
    'm.louradour@foodflex.com',
    'foodflex',
    2
  ),
  (
    'Jonathan',
    'Flamme',
    'j.flamme@foodflex.com',
    'foodflex',
    2
  );
-- Table: favori
INSERT INTO "favorite" (
    "idDbMeal",
    "user_id",
    "name",
    "image",
    "position"
  )
VALUES (
    '1',
    1,
    'Meal 1',
    'https:\/\/www.themealdb.com\/images\/media\/meals\/ustsqw1468250014.jpg',
    1
  ),
  (
    '2',
    1,
    'Meal 2',
    'https:\/\/www.themealdb.com\/images\/media\/meals\/ustsqw1468250014.jpg',
    2
  ),
  (
    '3',
    2,
    'Meal 3',
    'https:\/\/www.themealdb.com\/images\/media\/meals\/ustsqw1468250014.jpg',
    1
  ),
  (
    '52944',
    3,
    'Escovitch Fish',
    'https://www.themealdb.com/images/media/meals/1520084413.jpg',
    3
  ),
  (
    '53008',
    4,
    'Stuffed Lamb Tomatoes',
    'https://www.themealdb.com/images/media/meals/u55lbp1585564013.jpg',
    6
  ),
  (
    '52963',
    5,
    'Kapsalon',
    'https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg',
    10
  ),
  (
    '52963',
    6,
    'Shakshuka',
    'https://www.themealdb.com/images/media/meals/g373701551450225.jpg',
    12
  ),
  (
    '52944',
    7,
    'Escovitch Fish',
    'https://www.themealdb.com/images/media/meals/1520084413.jpg',
    2
  );
-- Table: scheduling
INSERT INTO "schedule" ("user_id", "week")
VALUES (3, '1'),
  (3, '2'),
  (3, '3'),
  (3, '4'),
  (4, '1'),
  (4, '2'),
  (4, '3'),
  (4, '4'),
  (5, '1'),
  (5, '2'),
  (5, '3'),
  (5, '4'),
  (6, '1'),
  (6, '2'),
  (6, '3'),
  (6, '4'),
  (7, '1'),
  (7, '2'),
  (7, '3'),
  (7, '4');
-- Table: meal
INSERT INTO "meal" (
    "idDbMeal",
    "schedule_id",
    "name",
    "image",
    "position"
  )
VALUES (
    '52988',
    1,
    'Classic Christmas pudding',
    'https://www.themealdb.com/images/media/meals/1d85821576790598.jpg',
    1
  ),
  (
    '52925',
    1,
    'Split Pea Soup',
    'https://www.themealdb.com/images/media/meals/xxtsvx1511814083.jpg',
    4
  ),
  (
    '52892',
    1,
    'Treacle Tart',
    'https://www.themealdb.com/images/media/meals/wprvrw1511641295.jpg',
    8
  ),
  (
    '52988',
    18,
    'Classic Christmas pudding',
    'https://www.themealdb.com/images/media/meals/1d85821576790598.jpg',
    1
  ),
  (
    '52925',
    18,
    'Split Pea Soup',
    'https://www.themealdb.com/images/media/meals/xxtsvx1511814083.jpg',
    4
  ),
  (
    '52892',
    18,
    'Treacle Tart',
    'https://www.themealdb.com/images/media/meals/wprvrw1511641295.jpg',
    8
  ),
  (
    '3',
    2,
    'Meal 3',
    'https:\/\/www.themealdb.com\/images\/media\/meals\/xvsurr1511719182.jpg',
    1
  );