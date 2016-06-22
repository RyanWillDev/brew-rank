// Require Express
const express = require('express');

// Store Express in app
const app = express();

// Require Mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/brew-rank');

const db = mongoose.connection;

app.get('/', (request, response) => response.send('Hello World'));

app.listen(3000, () => console.log('App is running'));
