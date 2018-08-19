const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subPointSchema = new Schema({
   point: Number}
);

// Create Schema
const PointSchema = new Schema({
  teamName: {type: String, default: "mckinnon"},
  points: [subPointSchema],
  totalPoints: {type: Number, default: 0}
});

module.exports = Point = mongoose.model('point', PointSchema);

module.exports = {
  Point: mongoose.model('point', PointSchema),
  SubPoint:  mongoose.model('subpoint', subPointSchema)
}

