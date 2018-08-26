import { combineReducers } from 'redux';
import gameReducer from './gameReducer';


//itemReducer is left as the reducer, switching to gameReducer causes multiple unncessary polling requests.

export default combineReducers({
  games: gameReducer
});
