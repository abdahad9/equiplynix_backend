const express = require('express');
const authenticate = require('../middleware/authenticate');
const EmployeeController = require('../controllers/employeeController');

const router = express.Router();

// Employee-specific routes
router.post('/register', EmployeeController.register);
router.post('/login', EmployeeController.login);

// Protected route for employee access
router.get('/protected', authenticate, async (req, res) => {
  try {
    // Additional protected route logic for employee access
    res.json({ message: 'Employee access granted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
