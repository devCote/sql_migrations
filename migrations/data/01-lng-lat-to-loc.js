const pg = require('pg');
const fs = require('fs');

const pwd = fs.readFileSync('../../../../.pg_password.txt', 'utf8').trim();

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'postgres',
  password: pwd,
});

pool
  .query(`UPDATE posts SET loc = POINT(lng, lat) WHERE loc IS NULL;`)
  .then(() => {
    console.log('Update Complete');
    pool.end();
  })
  .catch((err) => console.log(err.message));
