const express = require('express');

const router = express.Router();
const { armor } = require('../controllers/api.controller');

router.route('/')
  .get(armor.getAll);

router.route('/:id')
  .get(armor.getOne);

router.route('/type/:type')
  .get(armor.getAllByType);

module.exports = router;

/**
 * Represents an armor object.
 * @typedef {object} Armor
 * @property {number} id - The unique identifier for the armor.
 * @property {string} type - The type of the armor.
 * @property {string} name - The name of the armor.
 * @property {number} rarity - The rarity of the armor.
 * @property {number} defense - The defense value of the armor.
 * @property {object} resistances - The resistances of the armor.
 * @property {array<Skill>} skills - The skills of the armor.
 */

/**
 * GET /armors/
 * @tags Armor
 * @summary Get all armors
 * @return {object} 200 - success response
 * @return {array<Armor>} 200 - Array of Armor objects
 * @returns {Error} 404 - error response
 */

/**
 * GET /armors/{id}
 * @tags Armor
 * @summary Get one armor
 * @param {integer} id.path.required - ID of the armor to get
 * @return {object} 200 - success response
 * @return {Armor} 200 - Armor object
 * @returns {Error} 404 - error response
 */

/**
 * GET /armors/type/{type}
 * @tags Armor
 * @summary Get all armors by type
 * @param {string} type.path.required - Type of the armors to get
 * @return {object} 200 - success response
 * @return {array<Armor>} 200 - Weapon object
 * @returns {object} 404 - error response
 */
