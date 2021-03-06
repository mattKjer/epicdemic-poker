import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavBar/AppNavbar';
import JoinGameModalContainer from './redux/containers/JoinGameModalContainer';
import CreateGameModalContainer from './redux/containers/CreateGameModalContainer';
import PointModalContainer from './redux/containers/PointModalContainer';
import GameContainer from './redux/containers/GameContainer';

import store from './store';

import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <GameContainer />
            <div className="game-options">
              <JoinGameModalContainer />
              <CreateGameModalContainer />
              <PointModalContainer />
            </div>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
