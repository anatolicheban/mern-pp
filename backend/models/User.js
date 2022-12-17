const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  favourites: {
    type: Array,
    required: true,
    default: []
  },
  lastseen: {
    type: Array,
    required: true,
    default: []
  },
})

module.exports = model('User', userSchema)