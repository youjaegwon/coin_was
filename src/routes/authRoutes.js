const express = require('express');
const bcrypt = require('bcrypt'); // ✅ bcryptjs → bcrypt 변경
const { body, validationResult } = require('express-validator');
const { generateToken } = require('../config/jwt');

const router = express.Router(); // ✅ router 선언 추가

let users = [];

// 회원가입
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = { id: users.length + 1, email, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('🔥 Server Error:', error); // ✅ 오류 로그 추가
        res.status(500).json({ message: 'Server error', error: error.message }); // ✅ 오류 메시지 응답에 추가
    }
});

// 로그인
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
});

module.exports = router; // ✅ router 내보내기 추가
