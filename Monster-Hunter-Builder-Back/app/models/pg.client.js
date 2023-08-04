const pg = require('pg');

const { Client } = pg;
const logger = require('../utils/logger');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect((err) => {
  if (err) throw err;
  logger.log('Connecté à la base de données PostgreSQL !');
});

module.exports = client;
