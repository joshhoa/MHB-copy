-- Deploy mhbuilder:armor to pg

BEGIN;

CREATE TABLE "armor" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL UNIQUE,
    "rarity" INTEGER NOT NULL DEFAULT 1,
    "defense" INTEGER NOT NULL,
    "resistance_fire" INTEGER NOT NULL DEFAULT 0,
    "resistance_water" INTEGER NOT NULL DEFAULT 0,
    "resistance_thunder" INTEGER NOT NULL DEFAULT 0,
    "resistance_ice" INTEGER NOT NULL DEFAULT 0,
    "resistance_dragon" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "armor_has_skill" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "armor_id" INTEGER REFERENCES "armor"("id"),
    "skill_id" INTEGER REFERENCES "skill"("id"),
    "level" INTEGER DEFAULT(1)
);

-- Armor's view with all the specific data from skill and effect
CREATE VIEW armor_data AS 
SELECT 
    "armor".id, 
    "armor".type, 
    CONCAT("armor".type, '_', "armor".rarity) AS icon,
    "armor".name, 
    "armor".rarity, 
    "armor".defense, 
    json_build_object(
        'fire', "armor".resistance_fire, 
        'water', "armor".resistance_water, 
        'thunder', "armor".resistance_thunder, 
        'ice', "armor".resistance_ice, 
        'dragon', "armor".resistance_dragon
    ) AS resistances,
    COALESCE(
        json_agg(
            CASE
                WHEN "skill".id IS NULL THEN NULL
                ELSE json_build_object('id', "skill".id, 'name', "skill".name, 'level', "armor_has_skill".level, 'level_max', "skill".level_max, 'color', "skill".color)
            END
        ),
        '[]'::json -- Permet de renvoyer un tableau vide dans le cas où l'armure n'a pas de talener
    ) AS skills
FROM "armor"
LEFT JOIN "armor_has_skill" ON armor_id = "armor".id
LEFT JOIN "skill" ON "skill".id = "armor_has_skill".skill_id
GROUP BY "armor".id;

COMMIT;
