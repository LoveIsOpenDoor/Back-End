require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Welcome to the Love Advisor API 💕"));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.listen(5000, () => console.log('서버 실행 중! 🛠️ http://localhost:5000'));
