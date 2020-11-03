const router = require('express').Router();

// TODO: Remove file when finished, this only exists to test routing functionality

// tester
router.route('/test').get((req, res, next) => {
  return res.status(200).send("get works");
});

router.route('/test').post((req, res, next) => {
  return res.status(200).send("post works");
});

module.exports = router;
