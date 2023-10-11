const mysql2 = require("mysql2");

const connection = mysql2.createPool({
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
});

module.exports = connection.promise();
