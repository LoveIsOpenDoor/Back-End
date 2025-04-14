const pool = require('../config/db');

exports.insertUser = async (userId, hashedPW) => {
    const conn = await pool.getConnection();
    await conn.execute(`INSERT INTO users (user_id, password) VALUES (?, ?)`, [userId, hashedPW]);
    conn.release();
};

exports.getUserById = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute(`SELECT * FROM users WHERE user_id=?`, [userId]);
        conn.release();

        console.log("[getUserById 결과]", rows);  // 확인용 로그
        return rows[0];
    } catch (err) {
        console.error("[getUserById 에러]", err.message);
        throw err;  // 로그인 쪽 catch로 던짐
    }
};