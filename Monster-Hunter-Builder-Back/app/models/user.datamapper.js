const CoreDatamapper = require('./core.datamapper');

module.exports = class User extends CoreDatamapper {
  tableName = 'user';

  /**
   * Vérifie la présense de l'email et compare le password avec le password haché en BDD
   * @param {*} email
   * @returns {object} l'enregistrement du user
   */
  async findByEmail(email) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE email = $1 `,
      values: [email],
    };
    const resultQuery = await this.client.query(preparedQuery);
    if (!resultQuery.rows[0]) {
      return null;
    }
    return resultQuery.rows[0];
  }
};
