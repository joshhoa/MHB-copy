const { skill } = require('../models/index.datamapper');

const skillController = {
  async getAll(req, res) {
    const data = await skill.findAll();
    res.json(data);
  },
  async getOne(req, res) {
    const { id } = req.params;
    const data = await skill.findByPk(id);
    res.json(data);
  },
};

module.exports = skillController;
