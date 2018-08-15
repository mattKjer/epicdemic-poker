const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PointSchema = new Schema({
  points: {
    type: Number,
    default: 0
  }
});

module.exports = Point = mongoose.model('point', PointSchema);
