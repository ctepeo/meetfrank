import {
  SET_SIGNIN_PROCESSING,
  SET_SIGNIN_REDIRECT,
} from '../actions/_actions';

const initState = {
  isSignInProcessing: false,
  redirect: null,
};

const signInReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SIGNIN_PROCESSING:
      return {
        ...state,
        isSignInProcessing: action.data.isSignInProcessing,
      };
    case SET_SIGNIN_REDIRECT:
      return {
        ...state,
        redirect: action.data.redirect,
      };
    default:
      return state;
  }
};

export default signInReducer;
