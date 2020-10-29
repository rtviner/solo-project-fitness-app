const db = require('../models/fitnessTrackerModels');

const cookieController = {};

cookieController.setSSIDcookie = (req, res, next) => {
  // create a new browser cookie with ssid value set to res.locals.user
  const { user } = res.locals;
  res.cookie('ssid', user, { httpOnly: true });
  return next();
};

cookieController.startCookieSession = (req, res, next) => {
  // create a new instance of a cookie session with req.cookie.ssid as ssid...
  const newCookieSessionQuery = `
  INSERT INTO cookie_sessions (cookie_id)
  VALUES $1
  RETURNING created_at`;

  const { ssid } = req.cookie;
  const values = [ssid];

  db.query(newCookieSessionQuery, values)
    .then((data) => {
      console.log('New cookie session data received.', data.rows);
      return next();
    })
    .catch((err) => {
      return next({err});
    });

};

cookieController.verifySession = (req, res, next) => {
  // find cookie session by cookie_id in the db
  const cookieById = `
    SELECT * FROM cookieSessions
    WHERE cookie_id = $1`;
  //  use req.params.id for cookie_id value
  const { id } = req.params;
  const values = [id];

  db.query(cookieById, values)
    .then((data) => {
      // if no cookie session or cookie_id does not match req.cookies.ssid redirect to get signup route
      if (!data || data.cookie_id !== req.cookies.ssid) {
        return res.status(400).redirect('/');
      }
      return next();
    })
    .catch((err) => {
      return next({err});
    })
};

module.exports = cookieController;