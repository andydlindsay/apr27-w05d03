require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 6789;
const villainRouter = require('./routes/villain-router');

// view engine
app.set('view engine', 'ejs');

// middleware
app.use(morgan('dev'));
app.use('/villains', villainRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
