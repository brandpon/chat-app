const mongoose = require('mongoose');
const bCrypt = require('bcrypt');

const Schema = mongoose.Schema;
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    default: '',
    index: {unique : true}
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
    required: true,
  },
  colour: {
    type: String,
    default: '#FFFFFF',
    required: true,
  },
  preferences: {
    type: String,
    required: true,
    default: '',
  },
}, {
  timestamps: true
});

// hash password if it has been modified
userSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')) return next();

  bCrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) return next(err);

    bCrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err);
      user.password = hash;
      next();
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bCrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) return callback(err);
    // Returns true or false
    callback(null,isMatch);
  })
}


const User = mongoose.model('User', userSchema);

module.exports = User;
