import {
  SET_USERS_ONLINE,
} from '../actions/_actions';

const initState = {
  usersOnline: null,
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USERS_ONLINE:
      return {
        ...state,
        usersOnline: action.data.usersOnline,
      };
    default:
      return state;
  }
};

export default chatReducer;
