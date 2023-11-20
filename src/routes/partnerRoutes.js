const express = require('express');
const authenticate = require('../middleware/authenticate');
const PartnerController = require('../controllers/partnerController');

const router = express.Router();

// Partner-specific routes
router.post('/partner/register', PartnerController.register);
router.post('/partner/login', PartnerController.login);

// Protected route for partner access
router.get('/partner/protected', authenticate, (req, res) => {
  res.json({ message: 'Partner access granted' });
});

module.exports = router;
