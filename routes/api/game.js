const express = require('express');
const router = express.Router();

// Game instance id's for testing purposes
const dopesquad = "5b7b125be18acb5296675f2b";
const crispy = "5b7b08f490d0184c610c6987";

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

// @route   POST api/game/point/
// @desc    Create A Point
// @access  Public
router.post('/point', (req, res) => {
  Game.findById(dopesquad)
    .then(game => {
      let newSubPoint = new Point({
        point: req.body.points
      });
      game.points.push(newSubPoint);
      const total = game.points
                    .filter(e => e.point >=0)
                    .reduce((accumulator, amount) => accumulator + amount.point, 0);
      game.totalPoints = total;
      game.save(function (err) {
          if(err) return res.status(500).send('there was a problem saving the point to the database', err);
          return res.json(game)
          });
        }
      )
    .catch(err => res.status(404).json({ success: false, error: err })); 
});

// @route   POST api/game/:teamname
// @desc    Create a new Game
// @access  Public
router.post('/:id', (req, res) => {
  const newGame = new Game({
    teamName: req.params.id
  });
  newGame.save().then(game => res.json(game))
  .catch(err => res.status(404).json({ success: false, error: err }));;
});


// @route   PUT api/game/point/:id
// @desc    Update a Point
// @access  Public
router.put('/point/:id', (req, res) => {
  Game.findById(dopesquad)
    .then(game => {
      const subDoc = game.points.id('5b7b09c68044d84c8e283592');
      subDoc.point = req.body.points;

      const total = game.points
                    .filter(e => e.point >=0)
                    .reduce((accumulator, amount) => accumulator + amount.point, 0);

      game.totalPoints = total;
      game.save(function (err) {
        if(err) return res.status(500).send('there was a problem saving the point to the database', err);
      });
    })
    .then((game) => res.json(game))
    .catch(err => res.status(404).json({ success: false, error: err }));
});

module.exports = router;