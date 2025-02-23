require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes'); // ✅ routes 불러오기

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes); // ✅ API 기본 라우트 설정

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

module.exports = app;
