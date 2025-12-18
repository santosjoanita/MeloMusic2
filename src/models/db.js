const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();
console.log(`[DB] Ligado à Cloud: ${dbConfig.DB}`);

module.exports = promisePool;