const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'API Server Running!' });
});

router.use('/users', userRoutes);
router.use('/auth', authRoutes); // ✅ authRoutes 추가

module.exports = router;
