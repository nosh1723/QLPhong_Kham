const express = require('express');
const { register, login, getProfile, checkPhoneNumber, verification } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const errorMiddleware = require('../middleware/errorMiddleware')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
//router.post('/check-phone', checkPhoneNumber);
router.post('/verification', verification)

module.exports = router;
