require('dotenv').config();
const { Client } = require('pg');

const options = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};

const client = new Client(options);
client.connect(() => {
  console.log('connected to the database');
});

const verb = process.argv[2];
let id;

switch(verb) {
  case 'browse':
    client.query('SELECT * FROM movie_villains;')
      .then((response) => {
        console.log(response.rows);
        client.end();
      });
    break;
  case 'read':
    id = process.argv[3];
    client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
      .then((response) => {
        console.log(response.rows);
        client.end();
      });
    break;
  case 'edit':
    id = process.argv[3];
    const newVillain = process.argv[4];
    client.query('UPDATE movie_villains SET villain = $2 WHERE id = $1;', [id, newVillain])
      .then(() => {
        console.log('Villain updated successfully');
        client.end();
      });
    break;
  case 'add':
    const villainName = process.argv[3];
    const movie = process.argv[4];
    client.query('INSERT INTO movie_villains(villain, movie) VALUES($1, $2);', [villainName, movie])
      .then(() => {
        console.log('Villain spawned successfully');
        client.end();
      });
    break;
  case 'delete':
    id = process.argv[3];
    client.query('DELETE FROM movie_villains WHERE id = $1;', [id])
      .then(() => {
        console.log('Villain defeated!');
        client.end();
      });
    break;
  default:
    console.log('please type a BREAD verb');
    client.end();
    break;
}
