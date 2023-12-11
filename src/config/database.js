// En tu archivo database.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST || 'sql10.freesqldatabase.com',
  user: process.env.USER || 'sql10627826',
  password: process.env.PASS || 'YH6I5nV7ny',
  database: process.env.DB || 'sql10627826',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});


const promisePool = pool.promise();

// Intenta conectarte y maneja errores
promisePool.getConnection()
  .then((connection) => {
    console.log('Conexión exitosa a la base de datos');
    connection.release();
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = {
  conn: promisePool,
};
