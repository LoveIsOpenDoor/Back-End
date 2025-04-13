const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.signup = async (req, res) => {
    const { userId, password } = req.body;
    const hashedPW = await bcrypt.hash(password, 10);
    try {
        await userModel.insertUser(userId, hashedPW);
        res.status(201).json({ message: '회원가입 성공!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '회원가입 실패' });
    }
};

exports.login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await userModel.getUserById(userId);
        if (!user) return res.status(401).json({ error: '아이디가 존재하지 않아요' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: '비밀번호가 틀렸어요' });

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: '로그인 성공!', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '로그인 실패' });
    }
};

exports.verifyToken = (req, res) => {
    res.json({ success: true, message: "토큰 유효!" });
};