const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');

app.use(express.urlencoded({extended: false}));
app.use(express.json());


// SETUP ROUTES

// create a new user 

// create a new session

// look up all sessions by user_id (just have 1 user to start (user_id = 1))
app.get('/sessions')

// look up a specific session with date and user_id (user_id = 1)
app.get('/session')



app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});