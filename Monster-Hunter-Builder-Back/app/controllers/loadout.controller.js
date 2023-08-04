/* eslint-disable camelcase */
const { loadout, loadout_data } = require('../models/index.datamapper');

const loadoutController = {
  async getAll(req, res) {
    const data = await loadout_data.findAll();
    res.json(data);
  },
  async getOne(req, res) {
    const { id } = req.params;
    const data = await loadout_data.findByPk(id);
    res.json(data);
  },
  async getAllByUser(req, res) {
    const { id } = req.params;
    const data = await loadout_data.findAllBy('user_id', id);
    res.json(data);
  },
  async getAllLatest(req, res) {
    const data = await loadout_data.findAllLatest();
    res.json(data);
  },
  async createOne(req, res) {
    const user_id = req.userId;
    const {
      name, description, weapon_id, head_id, chest_id, arms_id, waist_id, legs_id,
    } = req.body;
    const { stats } = req;
    const newLoadout = await loadout.create({
      name, description, user_id, weapon_id, head_id, chest_id, arms_id, waist_id, legs_id, stats,
    });
    res.status(201).json(newLoadout);
  },
  async updateOne(req, res) {
    const loadoutId = req.params.id;
    const {
      name, description, weapon_id, head_id, chest_id, arms_id, waist_id, legs_id,
    } = req.body;
    const { stats, userId } = req;
    const data = await loadout.findByPk(loadoutId);
    if (userId === data.user_id) {
      const updatedLoadout = await loadout.update({
        id: data.id,
        name,
        description,
        weapon_id,
        head_id,
        chest_id,
        arms_id,
        waist_id,
        legs_id,
        stats,
      });
      res.status(201).json(updatedLoadout);
    } else {
      res.status(403).json({ error: 'Unauthorized access.' });
    }
  },
  async deleteOne(req, res) {
    const { userId } = req;
    const loadoutId = req.params.id;
    const { user_id } = await loadout.findByPk(loadoutId);
    if (userId === user_id) {
      const deletedData = await loadout.delete(loadoutId);
      res.status(201).json(deletedData);
    } else {
      res.status(403).json({ error: 'Unauthorized access.' });
    }
  },
};

module.exports = loadoutController;
