const pool = require('../config/db');

exports.insertChat = async (userId, question, answer) => {
    const conn = await pool.getConnection();
    await conn.execute(
        `INSERT INTO chat_logs (user_id, question, answer) VALUES (?, ?, ?)`,
        [userId, question, answer]
    );
    conn.release();
};

exports.getChatsByUserId = async (userId) => {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(`SELECT * FROM chat_logs WHERE user_id = ? ORDER BY create_at DESC`, [userId]);
    conn.release();
    return rows;
};

exports.deleteChatById = async (id) => {
    const conn = await pool.getConnection();
    await conn.execute(`DELETE FROM chat_logs WHERE id = ?`, [id]);
    conn.release();
};