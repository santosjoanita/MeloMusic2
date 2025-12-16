const mysql = require('mysql2');
require('dotenv').config();

// Criar a Pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Converter para Promises (para usar async/await)
const promisePool = pool.promise();

console.log(`[DB] A ligar à base de dados: ${process.env.DB_NAME}...`);

module.exports = promisePool;