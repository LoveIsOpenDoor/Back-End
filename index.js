require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("test");
});

//REST API 
// 챗봇 상담 결과 반환 및 DB 저장
app.post('/api/chat', async (req, res) => {
    const { userId, password, question } = req.body;
    let hashedPassword = "";

    try {
        const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "넌 연애상담 전문가야 공감하면서 따뜻하게 조언해줘" },
                { role: "user", content: question }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        const answer = gptResponse.data.choices[0].message.content;

        await bcrypt.hash(password, saltRounds, (err, hashedPW) => {
            if (err) {
                console.log('Error hashing password:', err);
            } else {
                hashedPassword = hashedPW;
                console.log('암호화된 패스워드', hashedPassword);
            }
        })

        const conn = await pool.getConnection();
        await conn.execute(
            `INSERT INTO chat_logs (user_id, password, question, answer) VALUES(?,?,?,?)`,
            [userId, hashedPassword, question, answer]
        );

        conn.release();

        res.json({ answer });

    } catch (err) {
        console.error('에러:', err.response?.data || err.message);
        res.status(500).json({ error: '상담 중 문제가 발생했어요 😢' });
    }
});

// 상담 전체리스트 반환
app.post(`/api/results`, async (req, res) => {
    let results = null;
    console.log("들어와잇");
    try {
        const conn = await pool.getConnection();
        results = await conn.query(`SELECT * FROM chat_logs`);
        conn.release();
        // const results = await pool.execute(`SELECT * FROM chat_logs;`, (err) => {
        //     if (err) {
        //         console.log("상담 리스트 반환 DB오류")
        //         console.log(err);
        //     }
        // });
        res.json(results[0]);
    }
    catch (err) {
        if (err) { console.log(err) }
    }
})

app.listen(3000, () => {
    console.log('서버 실행 중! 🛠️ http://localhost:3000');
});
