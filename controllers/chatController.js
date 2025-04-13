const axios = require('axios');
const chatModel = require('../models/chatModel');

exports.sendChat = async (req, res) => {
    const { userId, question } = req.body;

    try {
        const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "연애, 사랑과 관련없는 질문이 오면 너는 절때 답변해선 안돼! 그리고 넌 연애상담 전문가야 공감하면서 따뜻하게 조언해줘" },
                { role: "user", content: question }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        const answer = gptResponse.data.choices[0].message.content;
        await chatModel.insertChat(userId, question, answer);

        res.json({ answer });

    } catch (err) {
        console.error('에러:', err.response?.data || err.message);
        res.status(500).json({ error: '상담 중 문제가 발생했어요 😢' });
    }
};

exports.getAllChats = async (req, res) => {
    const { userId } = req.body;
    try {
        const chats = await chatModel.getChatsByUserId(userId);
        res.json(chats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '조회 실패' });
    }
};

exports.deleteChat = async (req, res) => {
    const { id } = req.params;
    try {
        await chatModel.deleteChatById(id);
        res.status(201).json({ message: '삭제 성공!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '삭제 실패' });
    }
};