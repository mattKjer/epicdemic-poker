import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';


class PointModal extends Component {
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

    const newPoint = {
      points: this.state.points,
      teamName: this.props.teamName,
      pointId: this.props.userPoint._id
    };
    
    if(newPoint.pointId === "") {
      this.props.createPoint(newPoint);
    } else {
      this.props.updatePoint(newPoint);
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
          Point
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Point Story</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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

PointModal.propTypes = {
  userPoint: PropTypes.object.isRequired,
  createPoint: PropTypes.func.isRequired,
  updatePoint: PropTypes.func.isRequired,
  teamName: PropTypes.string.isRequired
}

export default PointModal;
