const router = require('express').Router();
let Chatroom = require('../../models/chatroom.model');
const isAdmin = require('../../lib/isAdmin');

// Get all
router.route('/').get((req, res) => {
  Chatroom.find()
  .then(chatrooms => res.status(200).json(chatrooms))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Add one
router.route('/add').post(isAdmin,(req, res) => {
  const roomname = req.body.roomname;
  const description = req.body.description;
  const newChatroom = new Chatroom({roomname, description});

  newChatroom.save()
    .then(() => res.status(200).json('Chatroom added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get by ID
router.route('/:id').get((req, res) => {
  Chatroom.findById(req.params.id)
  .then(chatrooms => res.status(200).json(chatrooms))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Delete all
router.route('/all').delete((req, res) => {
  Chatroom.deleteMany()
  .then(chatrooms => res.json('All chatrooms deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Delete by ID
router.route('/:id').delete((req, res) => {
  Chatroom.findByIdAndDelete(req.params.id)
  .then(chatrooms => res.status(200).json('Chatroom deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Update (put) by ID
router.route('/:id/update/').put((req, res) => {
  Chatroom.findById(req.params.id)
  .then(chatroom => {
    chatroom.roomname = req.body.roomname || chatroom.roomname;
    chatroom.description = req.body.description || chatroom.description;

    chatroom.save()
    .then(() => res.status(200).json('Chatroom updated'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
});

// Update (add) messages
// Can only add to the message array
router.route('/:id/message').put((req, res) => {
  Chatroom.findById(req.params.id)
  .then(chatroom => {
    chatroom.messages.push({message : req.body.message, username: "TODO"});

    chatroom.save()
    .then(() => res.status(200).json('Message added'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
});

// Get messages


module.exports = router;
