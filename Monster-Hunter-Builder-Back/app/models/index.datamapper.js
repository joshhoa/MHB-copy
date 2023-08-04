const client = require('./pg.client');

const User = require('./user.datamapper');
const Loadout = require('./loadout.datamapper');
const LoadoutData = require('./loadout_data.datamapper');
const Armor = require('./armor.datamapper');
const Weapon = require('./weapon.datamapper');
const Decoration = require('./decoration.datamapper');
const Skill = require('./skill.datamapper');

module.exports = {
  user: new User(client),
  loadout: new Loadout(client),
  loadout_data: new LoadoutData(client),
  armor: new Armor(client),
  weapon: new Weapon(client),
  decoration: new Decoration(client),
  skill: new Skill(client),
};
