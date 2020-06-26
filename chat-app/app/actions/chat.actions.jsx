import {
  SET_USERS_ONLINE,
} from './_actions';

const setUserlist = (usersOnline) => async (dispatch) => {
  return dispatch({
    type: SET_USERS_ONLINE,
    data: {
      usersOnline: usersOnline,
    },
  });
};

const fetchChatHistory = () => async (dispatch) => {
  return dispatch({
    type: SET_USERS_ONLINE,
    data: {
      //usersOnline: usersOnline,
    },
  });
};

export { setUserlist };
