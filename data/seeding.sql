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
