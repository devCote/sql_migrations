const express = require('express');
const pg = require('pg');
const fs = require('fs');

const filePath = '../../.pg_password.txt';
const pwd = fs.readFileSync(filePath, 'utf8').trim();

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'postgres',
  password: pwd,
});

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const { rows } = await pool.query(`
  SELECT * FROM posts;
  `);

  res.send(`
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>lng</th>
          <th>lat</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => {
            return `
          <tr>
           <td>${row.id}</td>
           <td>${row.lng}</td>
           <td>${row.lat}</td>
          </tr>
          `;
          })
          .join('')}
      </tbody>
    </table>
    <form method="POST">
      <h3>Create Post</h3>
      <div>
        <label>lng</label>
        <input name="lng" />
      </div>
      <div>
        <label>lat</label>
        <input name="lat" />
      </div>
      <button type="submit">Create</button>
    </form>
  `);
});

app.post('/', async (req, res) => {
  const { lng, lat } = req.body;

  await pool.query('INSERT INTO posts (lat, lng) VALUES ($1, $2);', [lat, lng]);

  res.redirect('/');
});

app.listen(8888, () => {
  console.log('listening on port 8888');
});
