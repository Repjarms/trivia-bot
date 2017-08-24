'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const trivia = require('./lib/trivia');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello trivia bot');
});

app.post('/trivia', (req, res) => {
  if (req.body.text.includes('@trivia')) {
    trivia.question();
    res.send('hi');
  }
});

const PORT = process.env.PORT || 8005;

app.listen(PORT, () => {
  console.log('Trivia bot listening on port %s', PORT);
});
