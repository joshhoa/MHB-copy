// Handle and cath errors from routes

module.exports = {
  check(req, res, next) {
    try {
      next();
    } catch (error) {
      res.status(401).json({ error });
    }
  },
};
