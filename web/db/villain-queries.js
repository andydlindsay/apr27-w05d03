const client = require('./db');

const getVillains = (cb) => {
  client.query('SELECT * FROM movie_villains;')
    .then((response) => {
      cb(response.rows);
    });
};

const getVillainById = (id) => {
  return client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getVillains,
  getVillainById
};
