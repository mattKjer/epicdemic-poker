const express = require('express');
const router = express.Router();

// Point Model
const Point = require('../../models/Point');

// @route   GET api/points
// @desc    Get All Points
// @access  Public
router.get('/', (req, res) => {
  Point.find()
    .then(point => res.json(Point));
});

// @route   POST api/points
// @desc    Create An Point
// @access  Public
router.post('/', (req, res) => {
  const newPoint = new Point({
    points: req.body.points,
  });

  newPoint.save().then(point => res.json(point));
});

router.put('/:id', (req, res) => {
  Point.findByIdAndUpdate(req.params.id, { points: req.body.points })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
