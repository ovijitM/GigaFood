const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Fallback in case jwtSecret isn't defined

// User registration route
router.post('/createuser', 
    [body('email').isEmail(), body('password', 'Password must be at least 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User with this email already exists' });
            }

            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                location: req.body.location,
            });

            res.json({ success: true, user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

// User login route
router.post('/login',
    [
        body('email').isEmail(),
        body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: 'Invalid email or password' });
            }

            // Compare password with the stored hashed password
            const pwdCompare = await bcrypt.compare(password, user.password);
            if (!pwdCompare) {
                return res.status(400).json({ success: false, message: 'Invalid email or password' });
            }

            // JWT token generation
            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour

            console.log('Login success');
            res.status(200).json({ success: true, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
