// app.js
const express = require('express');
require('express-async-errors');
const authorRouter = require('./controllers/authors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const readingListRouter = require('./controllers/readingList.js');
const errorHandler = require('./middleware/errorHandler.js');
const { db } = require('./utils/db');

const connectToDb = async () => {
  await db.connect();
};

connectToDb();
const app = express();

app.use(express.json());

app.use('/api/authors', authorRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/readinglists', readingListRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

app.use(errorHandler);

app.on('close', () => {
  db.disconnect();
});

module.exports = app;

