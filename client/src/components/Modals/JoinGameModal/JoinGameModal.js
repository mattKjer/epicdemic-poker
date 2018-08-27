import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup
} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import PropTypes from 'prop-types';

class JoinGameModal extends Component {
  state = {
    modal: false,
    gameNames: [],
    selectedGame: ""
  };

  getGameNames = () => {
    axios.get(`/api/games/`)
    .then(res => {
      const formattedGameNames = res.data.map(teamName => {
        return { value: teamName, label: teamName}
      });
      this.setState({gameNames: formattedGameNames})});
  };

  componentDidMount() {
    this.getGameNames();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ selectedGame: e.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.joinGame(this.state.selectedGame);

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
          Join Game
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Select game to join</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Select 
                  options={this.state.gameNames} 
                  onChange={this.onChange}
                  name="selectedGame"
                  id="selectedGame"
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Join Game
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

JoinGameModal.propTypes = {
  joinGame: PropTypes.func.isRequired
};

export default JoinGameModal;

