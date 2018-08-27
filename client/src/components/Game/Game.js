import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import './Game.css';

import socketIOClient from 'socket.io-client'

class Game extends Component {
  
  render() {
    const socket = socketIOClient("http://localhost:5000");
    socket.on('connect', () => {console.log('I connected on client')});
    socket.on('updatePoints', () => {
      this.props.getGame(this.props.teamName);
    });

    return (
      <div className="game">
        <div className="point-info">
          <p>Team Name: {this.props.teamName}</p>
          <p>Total Points: {this.props.totalPoints}</p>
        </div>
        <div className="current-point">
            {this.props.userPoint}
        </div>
        <div className="points">
          {this.props.points && this.props.points.map(point => (
            <CSSTransition key={point._id} timeout={500} classNames="point">
              <div className="point">
                {point.point}
              </div>
            </CSSTransition>
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  getGame: PropTypes.func.isRequired,
  teamName: PropTypes.string,
  totalPoints: PropTypes.number,
    userPoint: PropTypes.number,
  points: PropTypes.array
};


export default Game;
