const express = require('express');

const router = express.Router();
const { decoration } = require('../controllers/api.controller');

router.route('/')
  .get(decoration.getAll);

router.route('/:id')
  .get(decoration.getOne);

module.exports = router;

/**
 * Represents a decoration object.
 * @typedef {object} Decoration
 * @property {number} id - The unique identifier for the decoration.
 * @property {string} name - The name of the decoration.
 * @property {integer} rank - The rarity of the decoration.
 * @property {integer} skill_id - The ID of the skill provided by the decoration.
 * @property {integer} level - The level of the skill provided by the decoration.
 */

/**
 * GET /decorations/
 * @tags Decoration
 * @summary Get all decorations
 * @return {object} 200 - success response
 * @return {array<Decoration>} 200 - User object
 * @returns {object} 404 - error response
 */

/**
 * GET /decorations/{id}
 * @tags Decoration
 * @summary Get one decoration
 * @param {integer} id.path.required - ID of the decoration to get
 * @return {object} 200 - success response
 * @return {Decoration} 200 - Decoration object
 * @returns {object} 404 - error response
 */
