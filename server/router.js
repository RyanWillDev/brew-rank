/* eslint-disable array-callback-return */

// Get the mongoose models
const Beer = require('./models/beerModel');
const User = require('./models/userModel');

// Require body-parser to handle POST reqs
const bodyParser = require('body-parser');

// Require JSON Web Tokens
const jwt = require('jsonwebtoken');

// Require config file
const config = require('./config');

// Pass Express as app into the router function
module.exports = function router(app) {
  // Configure express to use body-parser as middleware for POSTS
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.set('superSecret', config.secret);

  // Set CORS Headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, x-access-token, Content-Type, Accept');
    next();
  });

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
        Beer.find((err, beers) => { // eslint-disable-line
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
        // Create JWT to sign in new user
        const token = jwt.sign({ user: newUser._id }, app.get('superSecret'), {
          expiresIn: 3600,
          issuer: 'brewrank.com',
        });

        res.status(200).json({
          success: true,
          message: 'You have been authenticated.',
          token,
          id: newUser._id,
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
        } else if (user.beers.every((beer) => beer._id !== req.body._id)) {
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
          User.find((err, users) => { // eslint-disable-line
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
          Beer.find((err, beers) => { // eslint-disable-line
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

  // POST for Log In route
  app.post('/restapi/login', (req, res) => {
    // Look for user with provided credentials
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        throw err;
      }

      if (!user) {
        // If user is not found return error message
        res.status(401).json({ success: false, message: 'No user with that email found.' });
      } else if (user) {
        // Check if password matches
        if (user.password !== req.body.password) {
          // If password doesn't match return error message
          res.status(401).json({ success: false, message: 'Password was incorrect' });
        } else {
          // If the password is correct
          // Create a JWT
          const token = jwt.sign({ user: user._id }, app.get('superSecret'), {
            expiresIn: 3600,
            issuer: 'brewrank.com',
          });

          res.status(200).json({
            success: true,
            message: 'You have been authenticated.',
            token,
            id: user._id,
          });
        }
      }
    });
  });

  // Route middleware to verify token
  const authRoutes = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    if (token !== 'undefined') {
      // Verifies secret and checks if expired
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {
        if (err) {
          res.status(401).json({ success: false, message: 'Failed to authenticate token' });
        } else {
          // If everything is good, save to req for use in other routes
          req.decoded = decoded; // eslint-disable-line
          next();
        }
      });
    } else {
      // If there is no token
      // return error
      res.status(403).send({
        success: false,
        message: 'No token provided',
      });
    }
  };

  // GET to receive all of a users information once authenticated
  app.get('/restapi/profile/:userID', authRoutes, (req, res) => {
    // Get the userID from the params object
    const { userID } = req.params;

    // Search for the user by ID
    User.findOne({ _id: userID }, (err, user) => {
      if (err) {
        throw err;
      }
      let userData;
      Beer.populate(user, 'beers._id', (err, user) => { // eslint-disable-line
         // Get relevant parts of the user object
        userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          beers: user.beers,
          isAdmin: user.isAdmin,
        };
        // Send back the data
        res.status(200).json(userData);
      });
    });
  });

  app.post('/restapi/profile/:userID', authRoutes, (req, res) => {
    // Find user by _id and update the beers list to the list from the store.
    User.findOneAndUpdate({ _id: req.params.userID }, { $set: { beers: req.body } }, { new: true },
      (err) => {
        if (err) {
          res.status(500).json(err);
        }
        res.status(200);
      });
  });
};
