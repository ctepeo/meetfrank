import {
  SET_SIGNIN_PROCESSING, SET_SIGNIN_REDIRECT,
} from './_actions';
import socket from '_models/socketio.model.jsx';

const tryToSignIn = (userName) => async (dispatch) => {
  await dispatch({
    type: SET_SIGNIN_PROCESSING,
    data: {
      isSignInProcessing: true,
    },
  });
  try {
    await socket.sendSignIn(userName);
  }
  catch (e) {
    console.error(e);
  }
  return true;
};

const signedIn = () => async (dispatch) => {
  // all done
  await dispatch({
    type: SET_SIGNIN_PROCESSING,
    data: {
      isSignInProcessing: false,
    },
  });
  // redirect
  await dispatch({
    type: SET_SIGNIN_REDIRECT,
    data: {
      redirect: '/userlist',
    },
  });
};

export { signedIn, tryToSignIn };
