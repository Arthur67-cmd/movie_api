const mysql = require('mysql2/promise');
require('dotenv').config();
 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 4000,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : false,
  waitForConnections: true,
  connectionLimit: 10,
});
 
module.exports = pool;