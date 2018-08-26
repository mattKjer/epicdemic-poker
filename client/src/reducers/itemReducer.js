import {
  GET_GAME,
  CREATE_GAME,
  CREATE_POINT,
  UPDATE_POINT,
  DELETE_ITEM,
  ITEMS_LOADING,
} from '../actions/types';

const initialState = {
  game: {
    teamName: '',
    totalPoints: 0,
    points: []
  },
  userPoint: {
    point: 0,
    _id: ''
  },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAME:
      return {
        ...state,
        game: action.payload,
        loading: false
      };
      case CREATE_GAME:
      return {
        ...state,
        game: action.payload,
        userPoint: {
          point: 0,
          _id: ''
        },
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        game: state.items.filter(item => item._id !== action.payload)
      };
    case CREATE_POINT:
      return {
        ...state,
        userPoint: {...action.payload}
      };
    case UPDATE_POINT:
      return {
        ...state,
        userPoint: {...action.payload}
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
