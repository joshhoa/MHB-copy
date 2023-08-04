-- Revert mhbuilder:loadout from pg

BEGIN;

ALTER TABLE loadout DROP CONSTRAINT IF EXISTS loadout_user_id_fkey,
DROP VIEW IF EXISTS "loadout_data";
DROP TABLE IF EXISTS "loadout_has_armor";
DROP TABLE IF EXISTS "loadout";

COMMIT;
