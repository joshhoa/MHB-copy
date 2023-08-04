const { decoration } = require('../models/index.datamapper');

const decorationController = {
  async getAll(req, res) {
    const data = await decoration.findAll();
    res.json(data);
  },
  async getOne(req, res) {
    const { id } = req.params;
    const data = await decoration.findByPk(id);
    res.json(data);
  },
};

module.exports = decorationController;
