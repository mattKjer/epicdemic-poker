import axios from 'axios';
import { GET_GAME,CREATE_GAME, CREATE_POINT, UPDATE_POINT, DELETE_ITEM, ITEMS_LOADING } from '../actiontypes/GameTypes';

import socketIOClient from 'socket.io-client';

const socket = socketIOClient("http://localhost:5000");

export const getGame = teamName => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/games/${teamName}`).then(res =>
    dispatch({
      type: GET_GAME,
      payload: res.data
    })
  );
};

export const createGame = game => dispatch => {
  axios.post(`/api/games/`, game).then(res =>
    dispatch({
      type: CREATE_GAME,
      payload: res.data
    })
  );
};

export const createPoint = game => dispatch => {
  axios.post(`/api/games/${game.teamName}`, game).then(res =>
    dispatch({
      type: CREATE_POINT,
      payload: res.data
    })
  ).then(() => {
    socket.emit('pointsUpdated');
  });
};

export const updatePoint = game => dispatch => {
  axios.put(`/api/games/${game.teamName}`, game).then(res =>
    dispatch({
      type: UPDATE_POINT,
      payload: res.data
    })
  ).then(() => {
    socket.emit('pointsUpdated');
  });
};

export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  ).then(() => {
    socket.emit('pointsUpdated');
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
