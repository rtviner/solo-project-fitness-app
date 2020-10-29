const db = require('../models/fitnessTrackerModels');

const cookieController = {};

cookieController.setSSIDcookie = (req, res, next) => {
  // create a new browser cookie with ssid value set to res.locals.user
  const { user } = res.locals;
  res.cookie('ssid', user, { httpOnly: true });
  console.log("Cookie created successfully.");
  return next();
};

cookieController.startCookieSession = (req, res, next) => {
  // create a new instance of a cookie session with req.cookie.ssid as ssid...
  const newCookieSessionQuery = `
    INSERT INTO 
    cookie_sessions (cookie_id)
    VALUES ($1)
    RETURNING created_at`;

  const ssid = res.locals.user;
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

cookieController.deleteCookieSession = (req, res, next) => {
  const deleteCookieById = `
    DELETE FROM cookie_sessions
    WHERE cookie_id = $1
    RETURNING *`;
  const user = req.cookies.ssid;
  console.log("curr user: ", user);

  const values = [user];

  db.query(deleteCookieById, values)
    .then((data) => {
      console.log('Cookie session deleted: ', data.rows);
      return next();
    })
    .catch((err) => {
      return next({err});
    })
};

cookieController.verifySession = (req, res, next) => {
  // find cookie session by cookie_id in the db
  const cookieById = `
    SELECT * FROM cookie_sessions
    WHERE cookie_id = $1`;
  //  use req.params.id for cookie_id value
  const { id } = req.params;
  const values = [id];

  db.query(cookieById, values)
    .then((data) => {
      console.log("data received: ", data.rows);
      console.log("req cookies:", req.cookies.ssid);
      // if no cookie session or cookie_id does not match req.cookies.ssid redirect to get signup route
      if (!data.rows.length || data.rows[0].cookie_id !== req.cookies.ssid) {
        return res.status(400).redirect('/');
      }
      return next();
    })
    .catch((err) => {
      return next({err});
    })
};

module.exports = cookieController;