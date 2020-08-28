const router = require('express').Router();
let User = require('../models/user.model');

//Get all
router.route('/').get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Add one
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = "default@email.com";
  const preferences = "default preferences";
  const newUser = new User({username, password, email, preferences});

  newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete by ID
// router.route('/:id').delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//   .then(users => res.json('User deleted'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// Delete
router.route('/all').delete((req, res) => {
  User.deleteMany()
  .then(users => res.json('All Users deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
