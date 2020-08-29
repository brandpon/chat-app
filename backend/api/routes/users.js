const router = require('express').Router();
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../../lib/utils');

let User = require('../../models/user.model');

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
      return res.status(400).json({success:false, error:'Username already exists'});
    } else {

      const stringToColour = utils.stringToColour(username);

      const newUser = new User({
        username: username,
        password: password,
        email: email,
        preferences: 'Default',
        colour: stringToColour,
        admin: false,
      });
      newUser.save()
      .then(user => {
        const body = {_id: user._id, username: user.username, email: user.email,
           preferences: user.preferences, colour: user.colour, admin: false};

        const jwt = utils.issueJWT(user);

        // const cookie = res.cookie('jwt', jwt, {httpOnly: true});

        return res.json({success: true, user: body, token: jwt.token, expiresIn: jwt.expires});
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
      return res.status(401).json({success: false, error:'User not found'});
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch){

        console.log("Passwords matched");

        const body = {_id: user._id, username: user.username, email: user.email,
           preferences: user.preferences, colour: user.colour, admin: false};

        const jwt = utils.issueJWT(user);

        // res.cookie('jwt', jwt, {httpOnly: true});

        return res.json({success: true, user: body, token: jwt.token, expiresIn: jwt.expires});
      } else {
        console.log("Passwords don't match");
        return res.status(401).json({success: false, error: 'Password incorrect'});
      }
    })
  })
});

module.exports = router;
