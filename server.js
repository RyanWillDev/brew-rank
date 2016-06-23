// Set the port to the Heroku ENV variable or 3000
const port = process.env.PORT || 3000;

// Require Express
const express = require('express');

// Store Express in app
const app = express();

// Require Mongoose
const mongoose = require('mongoose');

// Connect mongoose to database
mongoose.connect('mongodb://localhost/brew-rank');

// Not sure this part is needed
// Alias the connection as db
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('connection is open');
// });

app.get('/', (request, response) => response.send('Hello World'));

app.listen(port, () => console.log('App is running'));
