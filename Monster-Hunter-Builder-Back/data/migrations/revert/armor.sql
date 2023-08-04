-- Revert mhbuilder:armor from pg

BEGIN;

DROP VIEW IF EXISTS "armor_data";
DROP TABLE IF EXISTS "armor_has_skill";
DROP TABLE IF EXISTS "armor";

COMMIT;
