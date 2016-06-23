// Get the mongoose models
const Beer = require('./models/beerModel');
const User = require('./models/userModel');

// Pass Express as app into the router function
module.exports = function router(app) {
  // Handle home route
  app.get('/', (request, response) => response.send('Hello World'));

  // Get req to /restapi/beers returns all beers
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

    // Get req to /restapi/users returns all users
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
};
