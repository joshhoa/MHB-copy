-- Deploy mhbuilder:weapon to pg

BEGIN;

CREATE TABLE "weapon" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL UNIQUE,
    "rarity" INTEGER NOT NULL DEFAULT 1,
    "attack" INTEGER NOT NULL,
    "affinity" INTEGER NOT NULL DEFAULT 0,
    "defense_bonus" INTEGER NOT NULL DEFAULT 0,
    "secret_effect" TEXT,
    "sharpness_red" INTEGER NOT NULL,
    "sharpness_orange" INTEGER,
    "sharpness_yellow" INTEGER,
    "sharpness_green" INTEGER,
    "sharpness_blue" INTEGER,
    "sharpness_white" INTEGER,
    "sharpness_purple" INTEGER
); 

CREATE TABLE "element" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "weapon_has_element" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "weapon_id" INTEGER NOT NULL REFERENCES "weapon"("id"),
    "element_id" INTEGER NOT NULL REFERENCES "element"("id"),
    "value" INTEGER NOT NULL
);

CREATE VIEW "weapon_data" AS 
SELECT 
  "weapon".id, 
  "weapon".type, 
  CONCAT("weapon".type, '_', "weapon".rarity) AS icon,
  "weapon".name, 
  "weapon".rarity,
  "weapon".attack,
  "weapon".affinity,
    COALESCE(
        json_agg(
            CASE
                WHEN "element".id IS NULL THEN NULL
                ELSE json_build_object('name', "element".name, 'value', "weapon_has_element".value)
            END
        ),
        '[]'::json -- Permet de renvoyer un tableau vide dans le cas où l'arme n'a pas d'élément
    ) AS elements,
  json_build_object(
    'red', "weapon".sharpness_red,
    'orange', "weapon".sharpness_orange,
    'yellow', "weapon".sharpness_yellow,
    'green', "weapon".sharpness_green,
    'blue', "weapon".sharpness_blue,
    'white', "weapon".sharpness_white,
    'purple', "weapon".sharpness_purple
  ) AS sharpness,
  "weapon".defense_bonus, 
  "weapon".secret_effect
FROM "weapon"
LEFT JOIN "weapon_has_element" ON "weapon".id = "weapon_has_element".weapon_id
LEFT JOIN "element" ON "element".id = "weapon_has_element".element_id
GROUP BY "weapon".id;

COMMIT;