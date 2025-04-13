const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify-token', require('../middlewares/auth'), authController.verifyToken);

module.exports = router;