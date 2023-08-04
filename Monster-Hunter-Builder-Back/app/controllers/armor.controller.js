const { armor } = require('../models/index.datamapper');

const armorController = {
  async getAll(req, res) {
    const data = await armor.findAll();
    res.json(data);
  },
  async getAllByType(req, res) {
    const { type } = req.params;
    const data = await armor.findAllBy('type', type);
    res.json(data);
  },
  async getOne(req, res) {
    const { id } = req.params;
    const data = await armor.findByPk(id);
    res.json(data);
  },
};

module.exports = armorController;
