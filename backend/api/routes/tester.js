const router = require('express').Router();
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../../lib/utils');
const Cookies = require('js-cookie');
const passport = require('passport');

// tester
router.route('/test').get((req, res, next) => {
  return res.status(200).send("get works");
});

router.route('/test').post((req, res, next) => {
  return res.status(200).send("post works");
});

module.exports = router;
