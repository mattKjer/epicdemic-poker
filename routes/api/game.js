const express = require('express');
const router = express.Router();

// Game Model
const {Game, Point} = require('../../models/Game');

// @route   GET api/game
// @desc    Get All Games
// @access  Public
router.get('/', (req, res) => {
  Game.find()
    .then(points => res.json(points));
});

// @route   GET api/points/:teamname
// @desc    Get All Points for a specific game
// @access  Public
router.get('/:id', (req, res) => {
  Game.find({teamName: req.params.id})
    .then(points => res.json(points));
});

// @route   POST api/game/:teamname
// @desc    Get All Points for a specific game
// @access  Public
router.post('/:id', (req, res) => {
  const newGame = new Game({
    teamName: req.params.id
  });
  newGame.save().then(game => res.json(game))
  .catch(err => res.status(404).json({ success: false, error: err }));;
});

// @route   POST api/game/point/
// @desc    Create An Point
// @access  Public
router.post('/point', (req, res) => {
  Game.findById('5b79600a4654dd0ee4f21bf6')
    .then(game => {
      let newSubPoint = new Point({
        point: req.body.points
      });
      game.points.push(newSubPoint);
      game.save(function (err) {
            console.log(err) // #sadpanda
          });
      return res.json(item)
        }
      )
    .catch(err => res.status(404).json({ success: false, error: err })); 
});

// @route   PUT api/game/point/:id
// @desc    Update a Point
// @access  Public
router.put('/point/:id', (req, res) => {
  Game.findById('5b79600a4654dd0ee4f21bf6')
    .then(game => {
      const subDoc = game.points.id('5b797761bf2ef11ad1a66e3b');
      subDoc.point = 45;

      const total = game.points
                    .filter(e => e.point >=0)
                    .reduce((accumulator, amount) => accumulator + amount.point, 0);

      game.totalPoints = total;
      game.save(function (err) {
        console.log(err) // #sadpanda
      });
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false, error: err }));
});

module.exports = router;