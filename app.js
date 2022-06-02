const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const router = require('./routes/index');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

module.exports = app;
