/* eslint-disable camelcase */
const { user } = require('../models/index.datamapper');

const userController = {
  async getAll(req, res) {
    const data = await user.findAll();
    res.json(data);
  },
  async getOne(req, res) {
    const { id } = req.params;
    const data = await user.findByPk(id);
    res.json(data);
  },
  async createOne(req, res) {
    const {
      email, password, username,
    } = req.body;
    const newUser = await user.create({
      email, password, username,
    });
    res.status(201).json(newUser);
  },
  async updateOne(req, res) {
    const user_id = req.params.id;
    const {
      username,
    } = req.body;
    const { userId } = req;
    const data = await user.findByPk(user_id);
    if (data.id === userId) {
      const updatedUser = await user.update({
        id: data.id, username,
      });
      res.status(201).json(updatedUser);
    } else {
      res.status(403).json({ error: 'Unauthorized access.' });
    }
  },
  async deleteOne(req, res) {
    const user_id = req.params.id;
    const { userId } = req;
    if (Number(user_id) === userId) {
      const deletedData = await user.delete(user_id);
      res.status(201).json(deletedData);
    } else {
      res.status(403).json({ error: 'Unauthorized access.' });
    }
  },
};

module.exports = userController;
