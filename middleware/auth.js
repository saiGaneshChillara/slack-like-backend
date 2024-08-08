const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res) => {
    const token = req.headers['authorization']?.replace('Bearer ','');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);

        if (!req.user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        next();
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = auth;