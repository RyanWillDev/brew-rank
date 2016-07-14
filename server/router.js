// Get the mongoose models
const Beer = require('./models/beerModel');
const User = require('./models/userModel');

// Require body-parser to handle POST reqs
const bodyParser = require('body-parser');

// Require passport
const passport = require('passport');

// Require routes
const handleLogIn = require('./routes/login');

const LocalStrategy = require('passport-local').Strategy;

// Pass Express as app into the router function
module.exports = function router(app) {
  // Configure express to use body-parser as middleware for POSTS
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Set CORS Headers
  app.all((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Configure express to use passport for Auth
  app.use(passport.initialize());
  //app.use(passport.session());

  passport.use(new LocalStrategy({
    usernameField: 'email',
  },
    (username, password, done) => {    // Find the user
      User.findOne({ email: username /* shorthand key value are the same */ }, (err, user) => {

        if (err) {
          return done(err);
        }

        // If user is not found
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        // If password is not correct
        if (!user.password === password) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        passport.serializeUser(function(user, done) {
          done(null, user.id);
        });

        // If Auth passed
        return done(null, user);
      });
    }
  ));

  // Handle home route
  app.get('/', (request, response) => response.send('Hello World'));

  // GET req to /restapi/beers returns all beers
  app.get('/restapi/beers', (req, res) => {
  // Check for query params
    if (Object.keys(req.query).length === 0) {
      // If there aren't any get all beers
      Beer.find((err, beers) => {
        if (err) {
          res.send(err);
        } else {
          // Send all beers as JSON
          res.json(beers);
        }
      });
    } else {
      // If there are params use it as a search to
      // find one beer
      Beer.find(req.query, (err, beer) => {
        if (err) {
          res.send(err);
        } else {
          // Send that beer as JSON
          res.json(beer);
        }
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

  // PUT req to add beer to users beer list
  app.put('/restapi/users', (req, res) => {
    if (req.query._id) {
      // If an _id was provided get and update user
      User.findById(req.query._id, (err, user) => {
        if (err) {
          res.send(err);
          // Check that the beer is not already in users list of beers
          // Uses loose because of type difference
        } else if (user.beers.every((beer) => beer._id != req.body._id)) {
          // Is not already in the list so...
          user.beers.push(req.body); // push to array...
          user.save(); // save the user...
          res.json(user); // and send back the updated user
        } else {
          // Error message if the beer has already been added.
          res.send('This user has already added this beer. Please try another brew.');
        }
      });
    } else {
      res.send('Please provide an _id of the user in a query.');
    }
  });

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

  app.post('/restapi/login', passport.authenticate('local'), handleLogIn);
};
