import {
  SET_APP_READY,
  SET_USERNAME,
} from './_actions';

const setUsername = (userName) => async (dispatch) => {
  return dispatch({
    type: SET_USERNAME,
    data: {
      userName: userName,
    },
  });
};

const setAppReady = (isAppReady) => async (dispatch) => {
  return dispatch({
    type: SET_APP_READY,
    data: {
      isAppReady: isAppReady,
    },
  });
};

export { setUsername, setAppReady };
