import { combineReducers } from 'redux';
import app from './app.reducer';
import chat from './chat.reducer';
import signin from './signin.reducer';

export default combineReducers({
  app,
  signin,
  chat,
});
