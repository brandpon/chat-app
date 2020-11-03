const router = require('express').Router();
const utils = require('../../lib/utils');
let User = require('../../models/user.model');

// User registration and login routes

// Register
router.route('/register').post((req, res, next) => {
  const { username, password } = req.body;
  const email = "default@mail.com";

  if (!username){
    return res.send({
      success: false,
      error: 'Error: Username can not be blank'
    })
  }

  if (!password){
    return res.send({
      success: false,
      error: 'Error: Password can not be blank'
    })
  }

  User.findOne({username: username})
  .then(user => {
    if (user){
      console.log('Username already exists');
      return res.status(400).json();
    } else {

      const stringToColour = utils.stringToColour(username);

      const newUser = new User({
        username: username,
        password: password,
        email: email,
        preferences: 'Default',
        colour: stringToColour,
      });
      newUser.save()
      .then(user => {
        
        // const body = {_id: user._id, username: user.username, email: user.email,
        //    preferences: user.preferences, colour: user.colour};

        const token = utils.issueJWT(user);

        res.cookie('jwt', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'});
        res.cookie('name', user.username, { maxAge: 24 * 60 * 60 * 1000, sameSite: 'strict'});
        return res.status(200).json({success: true});
      })
    }

    })
  });

// Login
router.route('/login').post((req, res, next) => {
  const { username, password } = req.body;
  User.findOne({username: username})
  .then(user => {
    // Check if user exists
    console.log("Login: Trying to find user " + username);

    if (!user){
      console.log('User not found');
      return res.status(401).json();
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err){throw err;}
      if (isMatch){

        console.log("Passwords matched");

        // const body = {_id: user._id, username: user.username, email: user.email,
        //    preferences: user.preferences, colour: user.colour};

        const token = utils.issueJWT(user);

        res.cookie('jwt', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'});
        res.cookie('name', user.username, { maxAge: 24 * 60 * 60 * 1000, sameSite: 'strict'});

        return res.status(200).json({success: true});
      } else {
        console.log("Passwords don't match");
        return res.status(401).json({success: false});
      }
    })
  })
});

module.exports = router;
