const db = require('../models/fitnessTrackerModels');
const redisConnection = require('../models/redisClientConfig');

const cookieController = {};

cookieController.setSSIDcookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user, { httpOnly: true });
  return next();
};

cookieController.startSession = (req, res, next) => {
 // create a new redis session
 
 // secret is res.locals.id
  return next();
};

cookieController.isLoggedIn = (req, res, next) => {
  return next();
};



module.exports = cookieController;