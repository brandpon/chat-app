const router = require('express').Router();
let Chatroom = require('../../models/chatroom.model');

// Get all
router.route('/').get((req, res) => {
  Chatroom.find()
  .then(chatrooms => res.json(chatrooms))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Add one
router.route('/add').post((req, res) => {
  const roomname = req.body.roomname;
  const description = req.body.description;
  const newChatroom = new Chatroom({roomname, description});

  newChatroom.save()
    .then(() => res.json('Chatroom added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get by ID
router.route('/:id').get((req, res) => {
  Chatroom.findById(req.params.id)
  .then(chatrooms => res.json(chatrooms))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Delete by ID
router.route('/:id').delete((req, res) => {
  Chatroom.findByIdAndDelete(req.params.id)
  .then(chatrooms => res.json('Chatroom deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Update (put) by ID
router.route('/update/:id').put((req, res) => {
  Chatroom.findById(req.params.id)
  .then(chatroom => {
    chatroom.roomname = req.body.roomname;
    chatroom.description = req.body.description;

    chatroom.save()
    .then(() => res.json('Chatroom updated'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
});

// need something for adding a message here
// then something for deleting and maybe another for editing a message

module.exports = router;
