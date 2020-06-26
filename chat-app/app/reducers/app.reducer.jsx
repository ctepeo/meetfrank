import {
  SET_USERNAME,
  SET_APP_READY,
  SET_TOKEN,
} from '../actions/_actions';

const initState = {
  userName: '',
  token: null,
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
