const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
   point: Number}
);

// Create Schema
const gameSchema = new Schema({
  teamName: {type: String, default: "mckinnon"},
  points: [pointSchema],
  totalPoints: {type: Number, default: 0}
});

module.exports = Game = mongoose.model('game', gameSchema);

module.exports = {
  Games: mongoose.model('game', gameSchema),
  Point:  mongoose.model('point', pointSchema)
}

