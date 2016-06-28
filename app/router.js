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
  // Check for query params
    if (Object.keys(req.query).length === 0) {
      // If there aren't any get all users
      Beer.find((err, users) => {
        if (err) {
          res.send(err);
        }
        // Send all beers as JSON
        res.json(users);
      });
    } else {
      // If there are params use it as a search to
      // find one beer
      Beer.find(req.query, (err, beer) => {
        if (err) {
          res.send(err);
        }
        // Send that beer as JSON
        res.json(beer);
      });
    }
  });

  // *** Commented out for historical puropses ***
  // // GET req to /restapi/beers returns all beers
  // app.get('/restapi/allbeers', (req, res) => {
  //   // Use the Beer model to find all beers
  //   Beer.find((err, beers) => {
  //     if (err) {
  //       res.send(err);
  //     }
  //     // Send all beers as JSON
  //     res.json(beers);
  //   });
  // });

  // // GET req with id to return specific beer
  // app.get('/restapi/beers/:id', (req, res) => {
  //   Beer.findById(req.params.id, (err, beer) => {
  //     res.send(beer);
  //   });
  // });

  // GET req to /restapi/users returns all users
  app.get('/restapi/users', (req, res) => {
  // Check for query params
    if (Object.keys(req.query).length === 0) {
      // If there aren't any get all users
      User.find((err, users) => {
        if (err) {
          res.send(err);
        } else {
          // Send all users as JSON
          res.json(users);
        }
      });
    } else {
      // If there are params use it as a search to find one user
      User.find(req.query, (err, user) => {
        if (err) {
          res.send(err);
        } else {
          // Send that user as JSON
          res.json(user);
        }
      });
    }
  });

  // *** Commented out for historical puropses ***
  // // GET req with id to return specific user
  // app.get('/restapi/users/:id', (req, res) => {
  //   User.findById(req.params.id, (err, user) => {
  //     res.send(user);
  //   });
  // });

  // GET req to return users by last name
  // app.get('/restapi/users', (req, res) => {
  //   console.log(req.query);

  //   // User.find(req.params.id, (err, user) => {
  //   //   res.send(user);
  //   // });
  // });

  // POST req to add a beer
  app.post('/restapi/beers', (req, res) => {
    // Create a newBeer from the data sent in request
    const newBeer = new Beer(req.body);
    // Save newBeer to the DB
    newBeer.save((err) => {
      if (err) {
        res.send(err);
      } else {
        // Return all the  beers in the DB
        Beer.find((err, beers) => { // App crashes without err here
          if (err) {
            res.send(err);
          } else {
            res.json(beers);
          }
        });
      }
    });
  });

  // POST req to add a user
  app.post('/restapi/users', (req, res) => {
    // Create a newUser from the data sent in request
    const newUser = new User(req.body);
    // Save newUser to the DB
    newUser.save((err) => {
      if (err) {
        res.send(err);
      } else {
        // Return all the users in the DB
        User.find((err, users) => { // App crashes without err here
          if (err) {
            res.send(err);
          } else {
            res.json(users);
          }
        });
      }
    });
  });

  // POST req to add beer to users beer list
    // If beer exists
      // add the id to the and users rating to beer list
    // Else
      // create new beer and add rating and beer to users beer list
    // update the beers total rating in the beers list

  // DELETE request with id to delete user
  app.delete('/restapi/users', (req, res) => {
    // Check if an _id was sent
    if (req.query._id) {
      // Remove user with sent _id
      User.remove(req.query, (err) => {
        if (err) {
          res.send(err);
        } else {
                // Return the updated list of users
          User.find((err, users) => {
            if (err) {
              res.send(err);
            } else {
              res.json(users);
            }
          });
        }
      });
    } else {
      // If no _id was provided
      res.send('Please provide an _id');
    }
  });

  // DELETE request with id to delete beer
  app.delete('/restapi/beers', (req, res) => {
    // Check if an _id was sent
    if (req.query._id) {
      // Remove beer with sent _id
      Beer.remove(req.query, (err) => {
        if (err) {
          res.send(err);
        } else {
          // Return the updated list of beers
          Beer.find((err, beers) => {
            if (err) {
              res.send(err);
            } else {
              res.json(beers);
            }
          });
        }
      });
    } else {
      // If no _id was provided
      res.send('Please provide an _id');
    }
  });
};
