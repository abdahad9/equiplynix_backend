const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  static async register(req, res) {
    try {
      // Extract user details from the request
      const { username, password, role } = req.body;

      // Check if the user already exists
      const existingUser = await User.findByEmail(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const userId = await User.createUser(username, hashedPassword, role);

      // Create a JWT token
      const token = jwt.sign({ userId, username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async login(req, res) {
    try {
      // Extract user details from the request
      console.log(req.body);
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await User.comparePasswords(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      console.log('user: ',process.env.JWT_SECRET_ADMIN);

      let secretKey;

      switch (user.role) {
        case 'admin':
          secretKey = process.env.JWT_SECRET_ADMIN;
          break;
        case 'user':
          secretKey = process.env.JWT_SECRET_USER;
          break;
        case 'partner':
          secretKey = process.env.JWT_SECRET_PARTNER;
          break;
        case 'customer':
          secretKey = process.env.JWT_SECRET_CUSTOMER;
          break;
        default:
      }

      // Create a JWT token using the selected secret key
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, secretKey, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = AuthController;
