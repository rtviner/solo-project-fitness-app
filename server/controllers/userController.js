const db = require('../models/fitnessTrackerModels');

const userController = {};

// create and save a new user in the db
userController.createUser = (req, res, next) => {
  next();
}

// make sure username and password from req.body match those found in the db at that username...
userController.verifyUser = (req, res, next) => {
  next();
}

module.exports = userController;