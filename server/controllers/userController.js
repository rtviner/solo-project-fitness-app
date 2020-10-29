const db = require('../models/fitnessTrackerModels');
const bcrypt = require('bcryptjs');

const userController = {};


// create and save a new user in the db
userController.createUser = (req, res, next) => {
  const newUserQuery = `
    INSERT INTO
    users (username, password) 
    VALUES ($1, $2)
    RETURNING user_id`;

  const { username, password } = req.body;
  console.log("og password: ", password);
  // bcrypt password before passing to DB
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next({err});
    bcrypt.hash(password, salt, (err, hash) => {
      console.log("hash :", hash);
      if (err) return next({err});
      
      const userValues = [username, hash];
 
      db.query(newUserQuery, userValues)
        .then((data) => {
          console.log("new user has been inserted:", data.rows[0]);
          res.locals.user = data.rows[0].user_id;
          return next();
        })
        .catch((err) => {
          console.log("global error handler will be called");
          return next({err});
        })
      });
  });
  
}

// make sure username and password from req.body match those found in the db at that username...
userController.verifyUser = (req, res, next) => {
  // find user by req.body.username
  const { username, password } = req.body;
  const findUserByNameQuery = `
    SELECT * 
    FROM users 
    WHERE username = $1`;
  const values = [username];

  db.query(findUserByNameQuery, values)
    .then((data) => {
      if (!data) res.redirect('/');
      else {
        const hash = data.rows[0].password;
        console.log("hash from db: ", hash);
        // check if users password matches req.body.password + salt bcrypted...
        bcrypt.compare(password, hash)
          .then((result) => {
            console.log("password match result: ", result);
            if (result === true) {
              res.locals.user = data.rows[0].user_id;
              return next();
            }
            // if not redirect to signup page
            res.redirect('/')
          })
          .catch((err) => {
            return next({err});
          })
      }
    });
}

module.exports = userController;