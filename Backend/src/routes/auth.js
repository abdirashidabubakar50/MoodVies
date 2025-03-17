// routes
const express = require('express')
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator')

const router = express.Router()

// Registering a user
router.post('/register', [
    body('Username').notEmpty().withMessage("Username is required"),
    body('email').isEmail().withMessage("Please enter a valid Email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be atleast 8 characters")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { Username, email, password } = req.body;
    
    try {
        // Check if the User already exists
        const existing_user = User.findOne({ email })
        if (existing_user) {
            return res.status(400).json({ error: 'User already exists' })
        }

        // Hash the password before saving
        const hashed_password = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            Username,
            email,
            password: hashed_password
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })


        res.status(201).json({ message: 'User created successfully', token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;