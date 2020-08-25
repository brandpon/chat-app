const router = require('express').Router();
let User = require('../models/user.model');

// Converts username to colour
// https://stackoverflow.com/questions/3426404/
// create-a-hexadecimal-colour-based-on-a-string-with-javascript
var stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

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
      const newUser = new User({
        username: username,
        password: password,
        email: email,
        preferences: 'Default',
        colour: stringToColour(username)
      });
      newUser.save();
      return res.json({success: true});
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
        // Need to have a cookie or something here
        console.log("Passwords matched");
        return res.json({success: true, token: "mytoken"});
      } else {
        console.log("Passwords don't match");
        return res.status(401).json({success: false, error: 'Password incorrect'});
      }
    })
  })
});

module.exports = router;
