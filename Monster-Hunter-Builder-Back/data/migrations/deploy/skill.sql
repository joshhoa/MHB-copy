-- Deploy mhbuilder:skill to pg

BEGIN;

CREATE TABLE "skill" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "level_max" INTEGER NOT NULL DEFAULT(1),
    "color" TEXT DEFAULT('#fff')
);

CREATE TABLE "effect" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    "skill_id" INTEGER REFERENCES "skill"("id"),
    "level" INTEGER,
    "description" TEXT NOT NULL,
    "modifier" JSON
);

CREATE VIEW "skill_data" AS
SELECT 
"skill".id,
"skill".name,
"skill".description AS skill_description,
"skill".color,
"effect".level,
"skill".level_max,
"effect".description AS effect_description,
"effect".modifier
FROM "skill"
JOIN "effect" ON "effect".skill_id = "skill".id;

COMMIT;
