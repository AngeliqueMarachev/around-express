const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { pageError } = require('./utils/constants');

app.use(bodyParser.json()); // or app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // or app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // paste the _id of the test user created in the previous step
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);

app.use((req, res) => {
  pageError(res);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});