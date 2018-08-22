import {
  GET_POINTS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';

const initialState = {
  game: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POINTS:
      //The mongoose api returns an array, I want this to be input into state as an object. 
      return {
        ...state,
        game: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        game: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      console.log(action.payload);
      return {
        ...state,
        game: [action.payload, ...state.game]
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
