const express = require('express');
const userSchema = require('../schemas/user.schema');
const validate = require('../middlewares/validate.middleware');

const token = require('../middlewares/token.middleware');

const router = express.Router();
const { user } = require('../controllers/api.controller');

router.route('/')
  .get(user.getAll);

router.route('/:id')
  .get(user.getOne)
  .put(validate(userSchema, 'body'), token.authentification, user.updateOne)
  .delete(token.authentification, user.deleteOne);

module.exports = router;

/**
 * Represents a User object.
 * @typedef {object} User
 * @property {integer} id - User ID
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} username - User username
 * @property {string} created_at - User created at
 * @property {string} updated_at - User updated at
 */

/**
 * GET /users
 * @tags User
 * @summary Get all user
 * @return {array<User>} 200 - An array of user info
 * @return {object} 404 - error response
 */

/**
 * GET /users/{id}
 * @tags User
 * @summary Get user by id
 * @param {number} id.path.required - User id
 * @return {User} 200 - An object of user info
 * @return {object} 404 - error response
 */
