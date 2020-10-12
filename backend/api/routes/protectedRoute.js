const router = require('express').Router();
const passport = require('passport');

router.route('/').get(passport.authenticate('jwt', {session: false}), (req, res, next) => {
  // console.log(req.user);
  console.log("?");
  next();
})

module.exports = router;
