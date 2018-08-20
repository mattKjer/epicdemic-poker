import {
  GET_POINTS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';

const initialState = {
  items: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POINTS:
      //The mongoose api returns an array, I want this to be input into state as an object. 
      return {
        ...state,
        items: action.payload[0],
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
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
