const express = require('express');
const authenticate = require('../middleware/authenticate');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/login', AuthController.login);

router.get('/protected', authenticate, async (req, res) => {
    try {
      // Additional protected route logic for employee access
      res.json({ message: 'login access granted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
