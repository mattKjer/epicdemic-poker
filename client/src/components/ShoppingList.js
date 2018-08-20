import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPoints, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

import socketIOClient from 'socket.io-client'

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getPoints('dopesquad');
  }
  
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  
  render() {
    
    const {teamName, totalPoints, points} = this.props.item.items;
    const socket = socketIOClient("http://localhost:5000");
    socket.on('connect', () => {console.log('I connected on client')});
    socket.on('updatePoints', () => {
      this.props.getPoints('dopesquad');
    });

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {points && points.map(point => (
              <CSSTransition key={point._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {/* <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, point._id)}
                  >
                    &times;
                  </Button> */}
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

ShoppingList.propTypes = {
  getPoints: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getPoints, deleteItem }
)(ShoppingList);
