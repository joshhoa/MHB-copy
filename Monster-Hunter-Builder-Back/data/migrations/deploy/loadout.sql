-- Deploy mhbuilder:loadout to pg

BEGIN;

-- Function to generate random ID for loadout
CREATE OR REPLACE FUNCTION generate_uid(size INT) RETURNS TEXT AS $$
DECLARE
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  bytes BYTEA := gen_random_bytes(size);
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$ LANGUAGE plpgsql VOLATILE;

CREATE TABLE "loadout" (
    "id" TEXT PRIMARY KEY DEFAULT generate_uid(7),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "weapon_id" INTEGER NOT NULL REFERENCES "weapon"("id"),
	  "head_id" INTEGER REFERENCES "armor"("id"),
	  "chest_id" INTEGER REFERENCES "armor"("id"),
	  "arms_id" INTEGER REFERENCES "armor"("id"),
	  "waist_id" INTEGER REFERENCES "armor"("id"),
	  "legs_id" INTEGER REFERENCES "armor"("id"),
    "stats" JSON NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

ALTER TABLE loadout
  ADD CONSTRAINT loadout_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES "user"(id)
    ON DELETE CASCADE;

CREATE VIEW "loadout_data" AS 
SELECT 
"loadout".id,
"loadout".name,
"loadout".description,
"loadout".user_id,
"user".username,
"loadout".weapon_id,
"weapon_data".icon,
"loadout".head_id,
"loadout".chest_id,
"loadout".arms_id,
"loadout".waist_id,
"loadout".legs_id,
"loadout".stats,
"loadout".created_at
FROM "loadout" 
JOIN "user" ON "user".id = "loadout".user_id
JOIN "weapon_data" ON "weapon_data".id = "loadout".weapon_id;


COMMIT;
