const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER || 'root',
    password: 'docker',
    database: 'StoreManager',
    port: '3306',
  });
  
  module.exports = connection;