/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const { skill, weapon, armor } = require('../models/index.datamapper');

async function updateWeaponStats(stats, weaponId) {
  if (weaponId) {
    try {
      const weaponData = await weapon.findByPk(weaponId);
      if (!weaponData) {
        throw new Error('Weapon data not found');
      }
      stats.attack += weaponData.attack;
      stats.affinity += weaponData.affinity;
      if (!weaponData.elements.includes(null)) {
        for (const element of weaponData.elements) {
          stats.elements.push(element);
        }
      }
      for (const [color, value] of Object.entries(weaponData.sharpness)) {
        if (value != null) {
          stats.sharpness[color] += value;
        }
      }
      stats.defense += weaponData.defense_bonus;
    } catch (error) {
      console.error('Error retrieving weapon data:', error);
    }
  }
}

async function updateArmorStats(stats, armorId) {
  if (armorId) {
    try {
      const armorData = await armor.findByPk(armorId);
      if (!armorData) {
        throw new Error('Armor data not found');
      }
      stats.defense += armorData.defense;
      for (const [element, value] of Object.entries(armorData.resistances)) {
        if (value != null) {
          stats.resistances[element] += value;
        }
      }
      if (!armorData.skills.includes(null)) {
        for (const oneSkill of armorData.skills) {
          const existingSkill = stats.skills.find((s) => s.id === oneSkill.id);
          if (existingSkill) {
            existingSkill.level += oneSkill.level;
            if (existingSkill.level > oneSkill.level_max) {
              existingSkill.level = oneSkill.level_max;
            }
          } else {
            stats.skills.push({
              id: oneSkill.id,
              name: oneSkill.name,
              level: oneSkill.level,
              level_max: oneSkill.level_max,
              color: oneSkill.color,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error retrieving armor data:', error);
    }
  }
}

async function calculSkillStats(stats) {
  for (const oneSkill of stats.skills) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const dataSkill = await skill.findEffect(oneSkill.id, oneSkill.level);
      if (dataSkill && !dataSkill.modifier.includes(null)) {
        for (const modifier of dataSkill.modifier) {
          const { field, operator, value } = modifier;
          if (field.includes('.')) {
            const [object, element] = field.split('.');
            if (object === 'elements') {
              const chosenElement = stats[object]?.find((e) => e && e.name === element);
              if (chosenElement) {
                if (operator === '+') {
                  chosenElement.value += value;
                } else if (operator === '*') {
                  chosenElement.value *= value;
                } else if (operator === '-') {
                  chosenElement.value -= value;
                }
              }
            }
            if (operator === '+') {
              stats[object][element] += value;
            } else if (operator === '*') {
              stats[object][element] *= value;
            } else if (operator === '-') {
              stats[object][element] -= value;
            }
          } else if (operator === '+') {
            stats[field] += value;
          } else if (operator === '*') {
            stats[field] *= value;
          } else if (operator === '-') {
            stats[field] -= value;
          }
        }
      }
    } catch (error) {
      console.log('Error occured while calculating data', error);
    }
  }
}

module.exports = {
  async stats(req, res, next) {
    const data = req.body;

    const stats = {
      attack: 0,
      affinity: 0,
      elements: [],
      sharpness: {
        red: 0,
        orange: 0,
        yellow: 0,
        green: 0,
        blue: 0,
        white: 0,
        purple: 0,
      },
      defense: 0,
      resistances: {
        fire: 0,
        water: 0,
        thunder: 0,
        ice: 0,
        dragon: 0,
      },
      skills: [],
    };

    updateWeaponStats(stats, data.weapon_id)
      .then(() => updateArmorStats(stats, data.head_id))
      .then(() => updateArmorStats(stats, data.chest_id))
      .then(() => updateArmorStats(stats, data.arms_id))
      .then(() => updateArmorStats(stats, data.waist_id))
      .then(() => updateArmorStats(stats, data.legs_id))
      .then(() => calculSkillStats(stats))
      .then(() => {
        req.stats = stats;
        next();
      })
      .catch((error) => {
        console.error('Error occurred while calculating stats:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  },
};
