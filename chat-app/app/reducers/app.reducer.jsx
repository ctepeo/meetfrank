import {
  SET_USERNAME,
  SET_APP_READY,
  SET_TOKEN,
} from '../actions/_actions';

const initState = {
  userName: 'ctepeo',
  token: 'a96ee71c-c458-4ee2-9397-5c428b47287a',
  isAppReady: false,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        userName: action.data.userName,
      };
    case SET_APP_READY:
      return {
        ...state,
        isAppReady: action.data.isAppReady,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.data.token,
      };
    default:
      return state;
  }
};

export default appReducer;
