// Middleware to encrypt password for the user Login

// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

// Encrypted password by salt = 10
const saltRounds = 10;

module.exports = {
  async password(req, res, next) {
    const { password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      req.body.password = hashedPassword;
      next();
    } catch (error) {
      res.status(500).send({ message: 'Erreur lors du hachage du mot de passe.' });
    }
  },
};
