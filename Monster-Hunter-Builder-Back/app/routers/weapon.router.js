const express = require('express');

const router = express.Router();
const { weapon } = require('../controllers/api.controller');

router.route('/')
  .get(weapon.getAll);

router.route('/:id')
  .get(weapon.getOne);

router.route('/type/:type')
  .get(weapon.getAllByType);

module.exports = router;

/**
 * Represents a weapon object.
 * @typedef {object} Weapon,
 * @property {number} id - The unique identifier for the weapon.
 * @property {string} type - The type of the weapon.
 * @property {string} name - The name of the weapon.
 * @property {integer} rarity - The rarity of the weapon.
 * @property {integer} attack - The attack of the weapon.
 * @property {integer} affinity - The affinity of the weapon.
 * @property {string} secret_effect - The secret effect of the weapon.
 * @property {Sharpness} sharpness - - The sharpness value of the weapon.
 * @property {Element} element - The elements value of the weapon.
 */

/**
 * Represents a sharpness object.
 * @typedef {object} Sharpness,
 * @property {integer} red - The red affinity of the weapon.
 * @property {integer} orange - The orange affinity of the weapon.
 * @property {integer} yellow - The yellow affinity of the weapon.
 * @property {integer} green - The green affinity of the weapon.
 * @property {integer} blue - The blue affinity of the weapon.
 * @property {integer} white - The white affinity of the weapon.
 * @property {integer} purple - The purple affinity of the weapon.
 */

/**
 * Represents a element object.
 * @typedef {object} Element,
 * @property {integer} fire - The fire element of the weapon.
 * @property {integer} water - The water element of the weapon.
 * @property {integer} thunder - The thunder element of the weapon.
 * @property {integer} ice - The ice element of the weapon.
 * @property {integer} dragon - The dragon element of the weapon.
 */

/**
 * GET /weapons/
 * @tags Weapon
 * @summary Get all weapon
 * @return {object} 200 - Success response
 * @return {array<Skill>} 200 - Array of Skill objects
 * @return {object} 404 - Error response
 */

/**
 * GET /weapons/{id}
 * @tags Weapon
 * @summary Get one weapon
 * @param {integer} id.path.required - ID of the weapon to get
 * @return {object} 200 - success response
 * @return {Weapon} 200 - Weapon object
 * @returns {object} 404 - error response
 */

/**
 * GET /weapons/type/{type}
 * @tags Weapon
 * @summary Get all weapons by type
 * @param {string} type.path.required - Type of the weapons to get
 * @return {object} 200 - success response
 * @return {Weapon} 200 - Weapon object
 * @returns {object} 404 - error response
 */
