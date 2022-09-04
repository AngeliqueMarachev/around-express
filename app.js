const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { pageError } = require('./utils/constants');

app.use(userRouter);
app.use(cardRouter);

app.use((req, res) => {
  pageError(res);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});