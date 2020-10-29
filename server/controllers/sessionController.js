const db = require('../models/fitnessTrackerModels');

const sessionController = {};


sessionController.getAllSessions = (req, res, next) => {
  // select all sessions for a specific user and return array of json objects as response?
  const { id } = req.params; 
  // select all sessions where user_id = id
  const allSessionsQuery = `
    SELECT * 
    FROM sessions 
    WHERE user_id = $1`;
  const values = [id];

  db.query(allSessionsQuery, values)
    .then((data) => {
      console.log("data received: ", data.rows)
      res.locals.sessions = data.rows;
      return next();
    })
    .catch((err) => {
      return next({err});
    })
}

sessionController.getSessionByDate = (req, res, next) => {
  // user id is req.params.id
  const { id } = req.params;
  // date is req.query.date
  const { date } = req.query;
  const sessionByDate = `
    SELECT * 
    FROM sessions 
    WHERE user_id = $1 AND completed_on = $2`;
  const values = [id, date];

  db.query(sessionByDate, values)
    .then((data) => {
      console.log("data received: ", data.rows);
      res.locals.session = data.rows;
      return next()
    })
    .catch((err) => {
      return next({err});
    });
    
}

sessionController.addSession = (req, res, next) => { 
  const newSessionQuery = `
    INSERT INTO sessions (completed_on, exercises, notes, user_id)
    VALUES ($1,$2,$3,$4)
    RETURNING session_id`;

  const { completed_on, exercises, notes } = req.body;
  const { id } = req.params;
  const sessionValues = [completed_on, exercises, notes, id];

  db.query(newSessionQuery, sessionValues)
    .then((data) => {
      console.log("new session has been added: ", data.rows[0]);
      res.locals.session = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({err})
    });
};

module.exports = sessionController;