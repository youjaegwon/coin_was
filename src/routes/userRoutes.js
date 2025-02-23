const express = require('express');
const { verifyToken } = require('../config/jwt');

const router = express.Router();

// JWT 보호 적용
router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'User Profile', user: req.user });
});

module.exports = router;
