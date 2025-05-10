const mongoose = require('mongoose');

const BicycleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['mountain', 'road', 'city', 'children', 'electric', 'bmx', 'folding', 'gravel', 'track']
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  frameSize: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'Universal']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bicycle', BicycleSchema); 