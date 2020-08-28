const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
  roomname: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    default: 'My room',
  },
  preferences: {
    type: String,
    default: '',
  },
}, {
  timestamps: true
});


const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
