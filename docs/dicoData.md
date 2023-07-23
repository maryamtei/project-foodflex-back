# Dictionnaire des données

## *Table User*

| Champ      | Type        | Clause                                 | Description                              |
|------------|-------------|----------------------------------------|------------------------------------------|
| id         | INT         | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | L'identifiant de l'utilisateur            |
| firstName  | VARCHAR(64) | NOT NULL                               | Le prénom de l'utilisateur               |
| lastName   | VARCHAR(64) | NOT NULL                               | Le nom de l'utilisateur                  |
| email      | VARCHAR(64) | NOT NULL, UNIQUE                       | Le mail de l'utilisateur                 |
| password   | VARCHAR(64) | NOT NULL                               | Le password de l'utilisateur              |
| cree_le    | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP    | La date de création de l'utilisateur     |
| modifie_le | TIMESTAMP   | NULL, DEFAULT CURRENT_TIMESTAMP        | La date de dernière modification de l'utilisateur |


## *Table rôle*

| Champ      | Type        | Clause                                 | Description                              |
|------------|-------------|----------------------------------------|------------------------------------------|
| id         | INT         | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | L'identifiant du rôle                     |
| name       | VARCHAR(30) | NOT NULL                               | Le nom du rôle                            |
| cree_le    | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP    | La date de création du rôle               |
| modifie_le | TIMESTAMP   | NULL, DEFAULT CURRENT_TIMESTAMP        | La date de dernière modification du rôle  |


## *Table Favori*

| Champ      | Type        | Clause                                 | Description                              |
|------------|-------------|----------------------------------------|------------------------------------------|
| id         | INTEGER     | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | L'identifiant du favori                   |
| idDbMeal   | INTEGER     | NOT NULL                               | L'ID de l'API externe                     |
| user_id    | INTEGER     | NOT NULL REFERENCES "user"("id")       | L'identifiant de l'utilisateur (clé étrangère) |
| name       | VARCHAR(30) | NOT NULL                               | Le nom du repas mis en favori             |
| image      | TEXT        | NOT NULL                               | L'image du repas mis en favori            |
| position   | INTEGER     | NOT NULL                               | Le numéro de la position du repas mis en favori dans son conteneur |
| cree_le    | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP    | La date de création du favori             |
| modifie_le | TIMESTAMP   | NULL, DEFAULT CURRENT_TIMESTAMP        | La date de dernière modification du favori |


## *Table Scheduling*

| Champ        | Type        | Clause                                 | Description                              |
|--------------|-------------|----------------------------------------|------------------------------------------|
| id (scheduling) | INT       | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | L'identifiant du schedule               |
| user_id (code_user)  | INT     | NOT NULL REFERENCES "user"("id")       | L'identifiant de l'utilisateur (clé étrangère) |
| week         | VARCHAR(30) | NOT NULL                               | La semaine correspondante                  |
| cree_le      | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP    | La date de création de l'utilisateur     |
| modifie_le   | TIMESTAMP   | NULL, DEFAULT CURRENT_TIMESTAMP        | La date de dernière modification de l'utilisateur |


## *Table Meal*

| Champ        | Type        | Clause                                 | Description                              |
|--------------|-------------|----------------------------------------|------------------------------------------|
| id (code_meal) | INT       | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | L'identifiant du repas                   |
| idDbMeal     | INTEGER     | NOT NULL                               | L'ID de l'API externe                     |
| scheduling_id (code_scheduling) | INTEGER | NOT NULL REFERENCES "scheduling"("id") | L'identifiant du planning (clé étrangère) |
| name         | TEXT        | NOT NULL                               | Le nom du repas enregistré                |
| image        | TEXT        | NOT NULL                               | L'image du repas enregistré               |
| position     | INTEGER     | NOT NULL                               | Le numéro de la position du repas enregistré dans le planning |
| créé_le      | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP    | La date de création de l'utilisateur     |
| modifié_le   | TIMESTAMP   | NULL, DEFAULT CURRENT_TIMESTAMP        | La date de dernière modification de l'utilisateur |
