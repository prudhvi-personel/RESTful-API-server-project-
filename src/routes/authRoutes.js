const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateUserRegistration, validateUserLogin, validate } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, validate, register);
router.post('/login', validateUserLogin, validate, login);

module.exports = router;
