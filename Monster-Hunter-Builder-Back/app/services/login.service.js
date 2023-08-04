/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/index.datamapper');

const tokenDuration = 86400;

module.exports = {
  // eslint-disable-next-line consistent-return
  async authentify(req, res) {
    const { email, password } = req.body;
    const data = await user.findByEmail(email);
    if (!data) {
      return res.status(400).json({ error: 'Invalid login or password' });
    }
    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid login or password' });
    }
    const token = jwt.sign({
      id: data.id,
      email: data.email,
      // ip: req.ip,
    }, process.env.JWT_SECRET, { expiresIn: tokenDuration });
    return res.json({ id: data.id, token, username: data.username });
  },
};
