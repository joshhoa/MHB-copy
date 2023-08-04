-- Revert mhbuilder:skill from pg

BEGIN;

DROP VIEW IF EXISTS "skill_data";
DROP TABLE IF EXISTS "effect";
DROP TABLE IF EXISTS "skill";

COMMIT;
