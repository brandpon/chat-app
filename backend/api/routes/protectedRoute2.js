const router = require('express').Router();
const passport = require('passport');

router.route('/').get(passport.authenticate('jwt', {session: false}), (req, res, next) => {
  // console.log(req);
  // res.json(req.user);
  console.log("Success");
  res.json("Success!");
  next();
})

module.exports = router;
