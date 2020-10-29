const express = require('express');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');

const path = require('path');


const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');

// parse request body
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

// SETUP ROUTES

// get root
app.get('/', (req, res) => {
  // render main app or login page?
  res.status(200).send("Homepage found");
});

// if a new user signs in, create a new user 
app.post('/signup', userController.createUser, cookieController.setSSIDcookie, cookieController.startCookieSession, (req, res) => {
  res.status(200).json(res.locals.user);
  // go to sessions page...
});

app.post('/login', userController.verifyUser, cookieController.setSSIDcookie, cookieController.startCookieSession, (req, res) => {
  res.status(200).json(res.locals.user);
  // go to sessions page...
});

app.post('/logout', cookieController.deleteCookieSession, (req, res) => {
  res.status(200).send("Logged out of session.");
});

/** Must be authorized to go to these routes, check cookies... */
// look up all sessions by user_id (just have 1 user to start (user_id = 1)
app.get('/sessions/:id', sessionController.getAllSessions, cookieController.verifySession, (req, res) => {
  // return json response (list of all session objects)
  res.status(200).json(res.locals.sessions);
});

// look up a specific session with date and user_id (user_id = 1)
app.get('/session', sessionController.getSessionByDate, cookieController.verifySession, (req, res) => {
  res.status(200).json(res.locals.session);
});

// create a new session
app.post('/session', sessionController.addSession, cookieController.verifySession, (req, res) => {
  res.status(200).json(res.locals.session)
  // go to sessions page...
})


// error handler for unknown route
app.use((req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  console.log("err recieved: ", err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured'}
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
