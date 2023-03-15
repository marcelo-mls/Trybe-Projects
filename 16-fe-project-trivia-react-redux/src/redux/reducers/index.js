import { combineReducers } from 'redux';
import playerReducer from './reducer';

const rootReducer = combineReducers({
  player: playerReducer,
});

export default rootReducer;
