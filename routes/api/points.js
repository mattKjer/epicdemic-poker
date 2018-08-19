const express = require('express');
const router = express.Router();

// Point Model
const {Point, SubPoint} = require('../../models/Point');

// @route   GET api/points
// @desc    Get All Points
// @access  Public
router.get('/', (req, res) => {
  Point.find()
    .then(points => res.json(points));
});

// @route   GET api/points/:teamname
// @desc    Get All Points for a specific game
// @access  Public
router.get('/:id', (req, res) => {
  Point.find({teamName: req.params.id})
    .then(points => res.json(points));
});

router.post('/newgame/:id', (req, res) => {
  const newGame = new Point({
    teamName: req.params.id
  });
  newGame.save().then(game => res.json(game))
  .catch(err => res.status(404).json({ success: false, error: err }));;
});

// @route   POST api/points
// @desc    Create An Point
// @access  Public
router.post('/', (req, res) => {
  Point.findById('5b79600a4654dd0ee4f21bf6')
    .then(item => {
      let newSubPoint = new SubPoint({
        point: req.body.points
      });
      item.points.push(newSubPoint);
      item.save(function (err) {
            console.log(err) // #sadpanda
          });
      return res.json(item)
        }
      )
    .catch(err => res.status(404).json({ success: false, error: err })); 
});

// @route   PUT api/points
// @desc    Update a Point
// @access  Public
router.put('/:id', (req, res) => {
  Point.findById('5b79600a4654dd0ee4f21bf6')
    .then(item => {
      const subDoc = item.points.id('5b797761bf2ef11ad1a66e3b');
      subDoc.point = 45;

      const total = item.points
                    .filter(e => e.point >=0)
                    .reduce((accumulator, amount) => accumulator + amount.point, 0);

      item.totalPoints = total;
      item.save(function (err) {
        console.log(err) // #sadpanda
      });
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false, error: err }));
});

module.exports = router;