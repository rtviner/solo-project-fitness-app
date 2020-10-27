const db = require('../models/fitnessTrackerModels');

const sessionController = {};


sessionController.getSessions = (req, res, next) => {
  next();
}

sessionController.getSessionByDate = (req, res, next) => {
  next()
}

sessionController.addSession = (req, res, next) => {

  next();
};

module.exports = sessionController;