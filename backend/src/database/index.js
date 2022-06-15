require('dotenv').config()

const pgp = require('pg-promise');

const initOptions = {
  pgFormatting: false
}

const pgConfig = {
  host: process.env.POSTGRES_DB_HOST,
  port: process.env.POSTGRES_DB_PORT,
  database: process.env.POSTGRES_DB_NAME,
  user: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PWRD,
  max: 5
};

const dbConnection = pgp(initOptions)(pgConfig);

module.exports = dbConnection;
