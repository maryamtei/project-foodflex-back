# FoodFlex

Unleash culinary creativity with foodflex! Create your custom recipe schedule.

## QuickStart

1. Duplicate ``.env.exemple`` to create your ``.env`` file.
2. Run `npm install`

Create DATABASE and USER with postgres :

3. Run ``sudo -i -u postgres psql``
4. Run ``CREATE ROLE userName LOGIN WITH PASSWORD 'userPasword'``
5. Run ``CREATE DATABASE databaseName OWNER userName``

To fill PG_URI in ``.env`` with the new database

6. Run ``sqitch deploy``
7. Run ``psql -U userName -d databaseName -f data/seeding.sql``
8. Run ``npm run dev``
