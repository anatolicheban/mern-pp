const { Schema, model, default: mongoose } = require('mongoose')

const adSchema = new Schema({
  images: {
    type: Array,
    default: []
  },
  owner: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
  ,
  date: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
})

module.exports = model('Advertisment', adSchema)