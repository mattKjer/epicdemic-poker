import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

class CreateGameModal extends Component {
  state = {
    modal: false,
    teamName: " "
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

    const newGame = {
      teamName : this.state.teamName
    };
    console.log('​CreateGameModal -> newGame', newGame);

    this.props.createGame(newGame);
    
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
          Create Game
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create a new game</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                    type="text"
                    name="teamName"
                    id="teamName"
                    placeholder="input a team name"
                    onChange={this.onChange}
                  />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Create Game
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

CreateGameModal.propTypes = {
  createGame: PropTypes.func.isRequired
};

export default CreateGameModal;

