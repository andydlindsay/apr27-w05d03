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

module.exports = client;
