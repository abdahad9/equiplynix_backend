const pgp = require('pg-promise')();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const dbd = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

console.log(dbd);

const db = pgp({
    connectionString,
    ssl: {
      rejectUnauthorized: true, // You may need to adjust this based on your database setup
    },
  });

module.exports = db;
