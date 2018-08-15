const express = require('express');
const router = express.Router();

// Point Model
const Point = require('../../models/Point');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Point.find()
    .then(point => res.json(Point));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newPoint = new Point({
    points: req.body.points,
  });

  newPoint.save().then(point => res.json(point));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
