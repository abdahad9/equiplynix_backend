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

console.log('connectionString');
console.log(connectionString);
// const db = pgp(cconnectionString);


const db = pgp({
    connectionString,
    ssl: {
        require: true,
      rejectUnauthorized: false, // You may need to adjust this based on your database setup
    },
  });

  console.log("db");
console.log(db);

module.exports = db;
