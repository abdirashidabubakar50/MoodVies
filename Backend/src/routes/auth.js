// routes
const express = require('express')
const {registerUser, loginUser} = require('../Controllers/authController')

const router = express.Router()

// Registering a user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

module.exports = router;