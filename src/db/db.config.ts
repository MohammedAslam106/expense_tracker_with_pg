const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'expense_tracker',
  password: 'Aslam106',
  port: 5432,
});

export default pool;