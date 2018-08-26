import axios from 'axios';
import { GET_POINTS, GET_GAME_NAMES, ADD_ITEM, UPDATE_POINT, DELETE_ITEM, ITEMS_LOADING } from './types';

import socketIOClient from 'socket.io-client';

const socket = socketIOClient("http://localhost:5000");

export const getGameNames = () => dispatch => {
  axios.get(`/api/games/`).then(res =>
    dispatch({
      type: GET_GAME_NAMES,
      payload: res.data
    })
  );
};

export const getPoints = (teamName = '') => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/games/${teamName}`).then(res =>
    dispatch({
      type: GET_POINTS,
      payload: res.data
    })
  );
};

export const addItem = game => dispatch => {
  axios.post(`/api/games/${game.teamName}`, game).then(res =>
    dispatch({
      type: ADD_ITEM,
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
