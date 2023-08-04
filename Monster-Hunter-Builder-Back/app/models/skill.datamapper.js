const CoreDatamapper = require('./core.datamapper');

module.exports = class Decoration extends CoreDatamapper {
  tableName = 'skill_data';

  /**
         * Récupération par identifiant
         * @param {number} id identifiant
         * @returns {object} un enregistrement
         */

  async findEffect(id, level) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE id = $1 AND level = $2`,
      values: [id, level],
    };

    const result = await this.client.query(preparedQuery);

    if (!result.rows[0]) {
      return null;
    }

    return result.rows[0];
  }
};
