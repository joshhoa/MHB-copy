const express = require('express');
const loadoutSchema = require('../schemas/loadout.schema');
const validate = require('../middlewares/validate.middleware');
const token = require('../middlewares/token.middleware');
const calcul = require('../middlewares/calcul.middleware');

const router = express.Router();
const { loadout } = require('../controllers/api.controller');

router.route('/')
  .get(loadout.getAll)
  .post(validate(loadoutSchema, 'body'), token.authentification, calcul.stats, loadout.createOne);
router.route('/filter/latest')
  .get(loadout.getAllLatest);
router.route('/:id')
  .get(loadout.getOne)
  .put(validate(loadoutSchema, 'body'), token.authentification, calcul.stats, loadout.updateOne)
  .delete(token.authentification, loadout.deleteOne);

router.route('/stats')
  .post(calcul.stats, (req, res) => {
    const stats = { ...req.stats };
    res.json({ stats });
  });

router.route('/user/:id')
  .get(loadout.getAllByUser);

module.exports = router;

/**
 * Represents a loadout object.
 * @typedef {object} Loadout
 * @property {number} id - The unique identifier for the loadout.
 * @property {string} name - The name of the loadout.
 * @property {string} description - The description of the loadout.
 * @property {integer} user_id - The ID of the user that owns the loadout.
 * @property {Weapon} weapon_id - The ID of the weapon that is equipped.
 * @property {Armor} head_id - The ID of the armor piece that is equipped as head.
 * @property {Armor} chest_id - The ID of the armor piece that is equipped as chest.
 * @property {Armor} arm_id - The ID of the armor piece that is equipped as arm.
 * @property {Armor} waist_id - The ID of the armor piece that is equipped as waist.
 * @property {Armor} leg_id - The ID of the armor piece that is equipped as leg.
 * @property {string} created_at - The date and time the loadout was created.
 * @property {string|null} updated_at - The date and time the loadout was last updated,
 * or null if never updated.
 */

/**
 * GET /loadouts
 * @tags Loadout
 * @summary Get all loadouts
 * @return {object} 200 - success response
 * @return {array<Loadout>} 200 - An array of Loadout objects
 * @returns {object} 404 - error response
 */

/**
 * GET /loadouts/{id}
 * @tags Loadout
 * @summary Get a loadout by ID
 * @param {integer} id.path.required - The ID of the loadout to get
 * @return {object} 200 - success response
 * @return {Loadout} 200 - The Loadout object
 * @returns {object} 404 - error response
 */

/**
 * GET /loadouts/user/{id}
 * @tags Loadout
 * @summary Get all loadouts
 * @param {integer} id.path.required - The ID of user
 * @return {object} 200 - success response
 * @return {array<Loadout>} 200 - An array of Loadout objects
 * @returns {object} 404 - error response
 */
