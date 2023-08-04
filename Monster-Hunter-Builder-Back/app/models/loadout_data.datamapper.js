const CoreDatamapper = require('./core.datamapper');

module.exports = class LoadoutData extends CoreDatamapper {
  tableName = 'loadout_data';

  async findAllLatest() {
    const result = await this.client.query(`SELECT * FROM "${this.tableName}" ORDER BY created_at DESC LIMIT 10`);

    return result.rows;
  }
};
