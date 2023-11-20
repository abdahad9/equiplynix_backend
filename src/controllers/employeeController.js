// /src/controllers/employeeController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

class EmployeeController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      // Check if the username is already taken
      const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await db.one(
        'INSERT INTO users(username, password, role) VALUES($1, $2, $3) RETURNING id, username, role',
        [username, hashedPassword, 'employee']
      );

      // Create a JWT token
      const token = jwt.sign({ userId: newUser.id, username: newUser.username, role: newUser.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = EmployeeController;
