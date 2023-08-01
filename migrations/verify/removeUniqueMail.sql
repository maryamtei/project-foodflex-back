-- Verify foodflex:removeUniqueMail on pg

BEGIN;

INSERT INTO "contact" ("name", "email", "message")
VALUES ('John Doe', 'john.doe@example.com', 'Message 1'),
       ('Jane Smith', 'john.doe@example.com', 'Message 2'),
       ('Jane Smith', 'john.doe@example.com', 'Message 2');

ROLLBACK;
