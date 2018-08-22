import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem, updatePoint } from '../actions/itemActions';

class ItemModal extends Component {
  state = {
    modal: false,
    points: 0
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      points: this.state.points,
      teamName: this.props.game.teamName,
      pointId: this.props.userPoint._id
    };

    if(this.props.userPoint.id === '') {
      this.props.addItem(newItem);
    } else {
      this.props.updatePoint(newItem);
    }

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          {this.props.buttonTitle}
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Point Story</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Point</Label>
                <Input
                  type="text"
                  name="points"
                  id="points"
                  placeholder="Add or update point"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Point Story
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.games.game,
  userPoint: state.games.userPoint
});

export default connect(
  mapStateToProps,
  { addItem, updatePoint }
)(ItemModal);
