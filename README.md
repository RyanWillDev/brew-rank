# brew-rank

An application to allow businesses to keep track of which of their beers people like most. 
Also allows users to keep up with and rate the beers they have tried. 
This is my first full stack app. It is hosted on a Heroku Dyno and mlab MongoDB instance. 
It has both a REST API and a GraphQL implementation.

#### Dependencies 
* Node
* Nodemon - For development ease
* Express
* Mongo
* Mongoose
* body-parser - To facilitate JSON Posts to the API

To get started clone the repo and run `npm install` to install all the dependencies. Then run `npm run dev` and visit `localhost:3000`.

REST API
--------

All REST API interactions are done from `/restapi/`. 

You can get a list of all the beers by sending a GET request to `/restapi/beers`. Passing any sort of query string will result in a look up by that query. Sending the following GET request `/restapi/beers?brewery=jackalope` will return a an array of all the beers with a brewery value of 'jackalope'. 

The available beer search queries are:
* _id
* name
* style
* rating
* inStock
* ingredients

A list of all the users will be returned from a GET request to, you guessed it, `/restapi/users`. In order to maintain consistency, a query string will also find all matching users. `/restapi/users?age=26` will return an array of all users who's age is equal to 26.

You can search users by:
* _id
* lastUpdateDate
* firstName
* lastName
* email
* age
* dateJoined
* isLoggedIn
* isAdmin

You can add new users and beers by sending a POST request to `/restapi/users` and `/restapi/beers`, respectively. The request body will be used to create and save a new entry in the database. The after the user or beer is saved it will respond with an array of all the users or beers.

Using PUT, you can add a beer to the users list of beers. You must provide an _id as a query `/restapi/user?_id=5771b4ce04eb0a2003356b10`. The _id of the beer you wish to add will need to be provided in the request body. If the beers _id does not already exist in the user's beers array, it will be added.

You can delete a user or beer by sending a DELETE request with the _id of the item you wish to delete, `/restapi/beers?_id=5771b4ce04eb0a2003356b10`.
