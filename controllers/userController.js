const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({
            message: 'User registered successfully!',
            user,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                message: 'Invalid Email!',
            });
        }

        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Password!',
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({
            message: 'Logged in successfully!',
            token,
        });
        
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
        });
    }
};