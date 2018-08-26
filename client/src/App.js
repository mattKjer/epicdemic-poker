import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import JoinGameModalContainer from './redux/containers/JoinGameModalContainer';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            
            <ItemModal buttonTitle="Point" />
            <JoinGameModalContainer />
            <ItemModal buttonTitle="Point" />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
