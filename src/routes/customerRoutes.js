const express = require('express');
const authenticate = require('../middleware/authenticate');
const CustomerController = require('../controllers/customerController');

const router = express.Router();

// Customer-specific routes
router.post('/customer/register', CustomerController.register);
router.post('/customer/login', CustomerController.login);

// Protected route for customer access
router.get('/customer/protected', authenticate, (req, res) => {
  res.json({ message: 'Customer access granted' });
});

module.exports = router;
