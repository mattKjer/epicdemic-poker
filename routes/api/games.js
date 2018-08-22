const express = require('express');
const router = express.Router();

// Game instance id's for testing purposes
const dopesquad = "5b7b125be18acb5296675f2b";
const crispy = "5b7b08f490d0184c610c6987";

// Game Model
const {Games, Point} = require('../../models/Game');

// @route   GET api/games
// @desc    Get All Games
// @access  Public
router.get('/', (req, res) => {
  Games.find()
    .then(game => res.json(game));
});

// @route   POST api/games/
// @desc    Create a new Game
// @access  Public
router.post('/', (req, res) => {
  const newGame = new Games({
    teamName: req.body.teamName
  });
  newGame.save()
  .then(game => res.json(game))
  .catch(err => res.status(404).json({ success: false, error: err }));;
});


// @route   GET api/games/:teamname
// @desc    Get game status for specific game
// @access  Public
router.get('/:teamName', (req, res) => {
  Games.find({teamName: req.params.teamName})
    .then(game => res.json(game));
});

// @route   POST api/games/:teamName
// @desc    Create A Point
// @access  Public
router.post('/:teamName', (req, res) => {
  Games.findById(req.body.gameId)
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

// @route   PUT api/games/:teamName
// @desc    Update a Point
// @access  Public
router.put('/:teamName', (req, res) => {
  Games.findById(req.body.gameId)
    .then(game => {
      const subDoc = game.points.id(req.body.pointId);
      subDoc.point = req.body.points;

      const total = game.points
                    .filter(e => e.point >=0)
                    .reduce((accumulator, amount) => accumulator + amount.point, 0);

      game.totalPoints = total;
      game.save(function (err) {
        if(err) return res.status(500).send('there was a problem saving the point to the database', err);
        return res.json(game);
      });
    })
    .catch(err => res.status(404).json({ success: false, error: err }));
});

module.exports = router;