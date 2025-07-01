const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabase',
  connectionLimit: 5
});

module.exports = pool;
