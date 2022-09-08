const mongoose = require('mongoose');

const { URL_REGEX } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return URL_REGEX.test(value); // will return true or false
      },
      message: 'Invalid URL',
    },
  },
})

module.exports = mongoose.model('user', userSchema);