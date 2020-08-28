const router = require('express').Router();
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../lib/utils');
const passport = require('passport');

router.route('/authorizedRoute').get(passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.status(200).json({success: true, message: 'You are authorized'});
})

module.exports = router;
