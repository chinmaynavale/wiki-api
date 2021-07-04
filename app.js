require('dotenv').config();

const express = require('express');
const app = express();

const articleRouter = require('./routes/articles');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Success! Connected to db'));

app.use('/', articleRouter);

app.listen(process.env.PORT || 3000);
