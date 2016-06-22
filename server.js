// Set the port to the Heroku ENV variable or 3000
let port = process.env.PORT || 3000;

// Require Express
const express = require('express');

// Store Express in app
const app = express();

// Require Mongoose
const mongoose = require('mongoose');

// Connect mongoose to database
mongoose.connect('mongodb://localhost/brew-rank');

// Alias the connection as db
const db = mongoose.connection;

app.get('/', (request, response) => response.send('Hello World'));

app.listen(port, () => console.log('App is running'));
