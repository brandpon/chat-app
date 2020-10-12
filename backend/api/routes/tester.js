const router = require('express').Router();
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../../lib/utils');
const Cookies = require('js-cookie');
const passport = require('passport');

// tester
router.route('/test').get((req, res, next) => {

  console.log("hi");
  return res.send("hi?");
});

router.route('/test').post((req, res, next) => {

  console.log("hi");
  return res.send("hi?");
});

// router.route('/test').get(passport.authenticate('jwt', {session:false}),(req, res, next) => {
//
//   console.log("hi");
//   return res.send("hi?");
// });
//
// router.route('/test').post(passport.authenticate('jwt', {session:false}),(req, res, next) => {
//
//   console.log("hi");
//   return res.send("hi?");
// });

module.exports = router;
