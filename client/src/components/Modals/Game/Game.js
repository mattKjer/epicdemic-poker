import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import socketIOClient from 'socket.io-client'

class Game extends Component {
  
  render() {
    const socket = socketIOClient("http://localhost:5000");
    socket.on('connect', () => {console.log('I connected on client')});
    socket.on('updatePoints', () => {
      this.props.getGame(this.props.teamName);
    });

    return (
      <Container>
        {this.props.totalPoints && `Total points: ${this.props.totalPoints}`}
        {this.props.teamName && `Game: ${this.props.teamName}`}
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {this.props.points && this.props.points.map(point => (
              <CSSTransition key={point._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {point.point}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

Game.propTypes = {
  getGame: PropTypes.func.isRequired,
  teamName: PropTypes.string,
  totalPoints: PropTypes.number,
  points: PropTypes.array
};


export default Game;
