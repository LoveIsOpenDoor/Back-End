create schema chatdb;

use chatdb; 

CREATE TABLE chat_logs (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id VARCHAR(100),
    question TEXT,
    answer TEXT,
    password TEXT,
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP
);