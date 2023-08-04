-- Revert mhbuilder:User from pg

BEGIN;

DROP TABLE IF EXISTS "user";

COMMIT;
