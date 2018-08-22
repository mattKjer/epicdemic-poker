const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');
const games= require('./routes/api/games');

const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('pointsUpdated', () => {
    socket.broadcast.emit('updatePoints');
  });
});

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
// Anything routed to /api/items will use this path and the items object passed into it.
// you can also use app.use('/api/points', points)
app.use('/api/items', items);
app.use('/api/games', games);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));
