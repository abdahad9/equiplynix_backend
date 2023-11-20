// const bcrypt = require('bcrypt');
const pgp = require('pg-promise')();
const dbConfig = require('../db');

const db = pgp(dbConfig);


class User {

  static async findByEmail(email) {
      const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
      return user;
  }

  static async findById(id) {
    // Implement database query to find a user by ID
  }

  static async createUser(username, password, role) {
    // Implement database query to create a user
  }

  // static async comparePasswords(candidatePassword, hashedPassword) {
  //   return bcrypt.compare(candidatePassword, hashedPassword);
  // }
}

module.exports = User;
