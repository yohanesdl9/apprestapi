var mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbrestapi'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('MySQL terkoneksi');
});

module.exports = conn;