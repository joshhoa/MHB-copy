// Middleware to handle incoming data to and from the database

module.exports = (schema, datasource) => async (req, res, next) => {
  try {
    await schema.validateAsync(req[datasource]);
    next();
  } catch (err) {
    next(err);
  }
};
