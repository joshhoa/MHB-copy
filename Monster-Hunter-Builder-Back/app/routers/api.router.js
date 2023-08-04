const express = require('express');
const userRouter = require('./user.router');
const loadoutRouter = require('./loadout.router');
const armorRouter = require('./armor.router');
const weaponRouter = require('./weapon.router');
const decorationRouter = require('./decoration.router');
const skillRouter = require('./skill.router');

const { user } = require('../controllers/api.controller');

const login = require('../services/login.service');
const encrypt = require('../middlewares/encrypt.middleware');
const token = require('../middlewares/token.middleware');
const userSchema = require('../schemas/user.schema');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.use('/users', userRouter);
router.use('/loadouts', loadoutRouter);
router.use('/armors', armorRouter);
router.use('/weapons', weaponRouter);
router.use('/decorations', decorationRouter);
router.use('/skills', skillRouter);

router.route('/register')
  .post(validate(userSchema, 'body'), encrypt.password, user.createOne);

router.route('/login')
  .post(login.authentify);

router.route('/logged')
  .post(token.authentification, (req, res) => {
    res.json(true);
  });

module.exports = router;
