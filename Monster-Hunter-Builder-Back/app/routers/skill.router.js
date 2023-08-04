const express = require('express');

const router = express.Router();
const { skill } = require('../controllers/api.controller');

router.route('/')
  .get(skill.getAll);

router.route('/:id')
  .get(skill.getOne);

module.exports = router;

/**
 * Represents a skill object.
 * @typedef {object} Skill
 * @property {number} id - The unique identifier for the skill.
 * @property {string} name - The name of the skill.
 * @property {string} description - The description of the skill.
 * @property {integer} level_max - The maximum level of the skill.
 * @property {string} color - The color of the skill.
 */

/**
 * GET /skills/
 * @tags Skill
 * @summary Get all skills
 * @return {object} 200 - Success response
 * @return {array<Skill>} 200 - Array of Skill objects
 * @return {object} 404 - Error response
 */

/**
 * GET /skills/{id}
 * @tags Skill
 * @summary Get one skill
 * @param {integer} id.path.required - ID of the skill to get
 * @return {object} 200 - Success response
 * @return {Skill} 200 - Skill object
 * @return {object} 404 - Error response
 */
