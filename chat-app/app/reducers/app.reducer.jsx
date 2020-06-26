import {
  SET_USERNAME,
  SET_APP_READY,
} from '../actions/_actions';

const initState = {
  userName: 'ctepeo',
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
    default:
      return state;
  }
};

export default appReducer;
