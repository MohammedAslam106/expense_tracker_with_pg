// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'expense_tracker',
//   password: 'Aslam106',
//   port: 5432,
// });

// export default pool;
import {drizzle} from 'drizzle-orm/vercel-postgres'
import {sql} from '@vercel/postgres'
// import * as schemas from '@/db/schemas/user'


// const connectionString = process.env.POSTGRES_URL
// const pool = new Pool({connectionString,max:1})

export const db = drizzle(sql)

