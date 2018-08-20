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

// @route   GET api/game/:teamname
// @desc    Get All Points for a specific game
// @access  Public
router.get('/:id', (req, res) => {
  Game.find({teamName: req.params.id})
    .then(points => res.json(points));
});

// @route   POST api/game/:teamname
// @desc    Create a new Game
// @access  Public
router.post('/', (req, res) => {
  const newGame = new Game({
    teamName: req.params.id
  });
  newGame.save().then(game => res.json(game))
  .catch(err => res.status(404).json({ success: false, error: err }));;
});

// @route   POST api/game/point/
// @desc    Create A Point
// @access  Public
router.post('/point', (req, res) => {
  Game.findById('5b7aa7f3425140321d6daa29')
    .then(game => {
      let newSubPoint = new Point({
        point: req.body.points
      });
      game.points.push(newSubPoint);
      game.save(function (err) {
          if(err) return res.status(500).send('there was a problem saving the point to the database', err);
          return res.json(game)
          });
        }
      )
    .catch(err => res.status(404).json({ success: false, error: err })); 
});

// @route   PUT api/game/point/:id
// @desc    Update a Point
// @access  Public
router.put('/point/:id', (req, res) => {
  Game.findById('5b7aa7f3425140321d6daa29')
    .then(game => {
      const subDoc = game.points.id('5b797761bf2ef11ad1a66e3b');
      subDoc.point = 45;

      const total = game.points
                    .filter(e => e.point >=0)
                    .reduce((accumulator, amount) => accumulator + amount.point, 0);

      game.totalPoints = total;
      game.save(function (err) {
        if(err) return res.status(500).send('there was a problem saving the point to the database', err);
      });
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false, error: err }));
});

module.exports = router;