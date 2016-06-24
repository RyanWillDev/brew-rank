// Get the mongoose models
const Beer = require('./models/beerModel');
const User = require('./models/userModel');

// Require body-parser to handle POST reqs
const bodyParser = require('body-parser');

// Pass Express as app into the router function
module.exports = function router(app) {
  // Configure express to use body-parser as middleware for POSTS
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Handle home route
  app.get('/', (request, response) => response.send('Hello World'));

  // GET req to /restapi/beers returns all beers
  app.get('/restapi/beers', (req, res) => {
    // Use the Beer model to find all beers
    Beer.find((err, beers) => {
      if (err) {
        res.send(err);
      }
      // Send all beers as JSON
      res.json(beers);
    });
  });

    // GET req to /restapi/users returns all users
  app.get('/restapi/users', (req, res) => {
  // Use the User model to find all users
    User.find((err, users) => {
      if (err) {
        res.send(err);
      }
      // Send all users as JSON
      res.json(users);
    });
  });

  // POST req to add a beer
  app.post('/restapi/addbeer', (req, res) => {
    // Create a newBeer from the data sent in request
    const newBeer = new Beer(req.body);
    // Save newBeer to the DB
    newBeer.save((err) => {
      if (err) {
        res.send(err);
      }
      // Return all the  beers in the DB
      Beer.find((err, beers) => {
        res.json(beers);
      });
    });
  });

  // POST req to add a user
  app.post('/restapi/adduser', (req, res) => {
    // Create a newBeer from the data sent in request
    const newUser = new User(req.body);
    // Save newUser to the DB
    newUser.save((err) => {
      if (err) {
        res.send(err);
      }
      // Return all the  beers in the DB
      User.find((err, users) => {
        res.json(users);
      });
    });
  });
};
