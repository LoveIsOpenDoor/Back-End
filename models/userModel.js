const pool = require('../config/db');

exports.insertUser = async (userId, hashedPW) => {
    const conn = await pool.getConnection();
    await conn.execute(`INSERT INTO users (user_id, password) VALUES (?, ?)`, [userId, hashedPW]);
    conn.release();
};

exports.getUserById = async (userId) => {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute(`SELECT * FROM users WHERE user_id=?`, [userId]);
    conn.release();
    return rows[0];
};