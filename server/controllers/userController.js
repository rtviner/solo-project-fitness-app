const db = require('../models/fitnessTrackerModels');
const bcrypt = require('bcryptjs');

const userController = {};

// create and save a new user in the db
userController.createUser = (req, res, next) => {
  const newUserQuery = `
    INSERT INTO
    users (username, password) 
    VALUES ($1, $2)
    RETURNING user_id`;

  const { username, password } = req.body;

  const userValues = [username, password];
 
  db.query(newUserQuery, userValues)
    .then((data) => {
      console.log("new user has been inserted:", data.rows[0]);
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      console.log("global error handler will be called");
      return next({err});
    })
}

// make sure username and password from req.body match those found in the db at that username...
userController.verifyUser = (req, res, next) => {
  // find user by req.body.username
  // get salt from bcrypt...
  // check if users password matches req.body.password + salt bcrypted...
  // if so res.locals.user = res data.id
  // if not redirect to signup page

  next();
}

module.exports = userController;