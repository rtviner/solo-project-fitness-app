const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');

// parse request body
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// SETUP ROUTES

// get root
app.get('/', (req, res) => {
  // render main app or login page?
});

// if a new user signs in, create a new user 
app.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
  // go to sessions page...
});

// look up all sessions by user_id (just have 1 user to start (user_id = 1))
app.get('/sessions/:id', sessionController.getAllSessions, (req, res) => {

});

// look up a specific session with date and user_id (user_id = 1)
app.get('/session', sessionController.getSessionByDate, (req, res) => {

});

// create a new session
app.post('/session', sessionController.addSession, (req, res) => {
  res.status(200).json(res.locals.session)
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
