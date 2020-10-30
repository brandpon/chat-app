const router = require('express').Router();

// tester
router.route('/test').get((req, res, next) => {
  return res.status(200).send("get works");
});

router.route('/test').post((req, res, next) => {
  return res.status(200).send("post works");
});

module.exports = router;
