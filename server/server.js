// Set the port to the Heroku ENV variable or 3000
const port = process.env.PORT || 3000;

// Require Express
const express = require('express');

// Store Express in app
const app = express();

// Require Mongoose
const mongoose = require('mongoose');

// Require router
const router = require('./router');

// Connect mongoose to database
mongoose.connect('mongodb://localhost/brew-rank');

// !!!Still not sure if I need this!!!
// Alias the connection as db
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// Once the connection is open start router
// db.once('open');

// Start router to handle requests
router(app);

app.listen(port, () => console.log('App is running'));
