// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(5).max(40),
  description: Joi.string().max(1000).allow('').optional(),
  user_id: Joi.number(),
  weapon_id: Joi.number(),
  head_id: Joi.number(),
  chest_id: Joi.number(),
  arms_id: Joi.number(),
  waist_id: Joi.number(),
  legs_id: Joi.number(),
});
