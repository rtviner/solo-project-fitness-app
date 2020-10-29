const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// create the server
const app = express();


const PORT = 3000;

const path = require('path');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');

// parse request body
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//parse cookies in request body
app.use(cookieParser());
app.use(session({secret: "secret"}));

// SETUP ROUTES

// get root
app.get('/', (req, res) => {
  // render main app or login page?
  res.status(200).send("Hompeage found");
});

// if a new user signs in, create a new user 
app.post('/signup', userController.createUser, cookieController.setSSIDCookie, cookieController.startSesion, (req, res) => {
  res.status(200).json(res.locals.user);
  // go to sessions/:id page...
});

// if a user signs in, verify the username and password, start a new session for user
app.post('login', userController.verifyUser, cookieController.setSSIDCookie, cookieController.startSesion, (req, res) => {
  res.status(200).json(res.locals.user);
  // go to sessions/:id page...
});

/**
 * Need to check if users are loggin in for all these get routes???
 */
// look up all sessions by user_id (just have 1 user to start (user_id = 1))
app.get('/sessions/:id', sessionController.getAllSessions, (req, res) => {
  // return json response (list of all session objects)
  res.status(200).json(res.locals.sessions);
});

// look up a specific session with date and user_id as req.queries?(user_id = 1)
app.get('/session/:id', sessionController.getSessionByDate, (req, res) => {
  res.status(200).json(res.locals.session);
});

// create a new session
app.post('/session', sessionController.addSession, (req, res) => {
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
