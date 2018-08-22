import axios from 'axios';
import { GET_POINTS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

import socketIOClient from 'socket.io-client';

const socket = socketIOClient("http://localhost:5000");


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
