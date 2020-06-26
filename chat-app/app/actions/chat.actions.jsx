import {
  SET_USERS_ONLINE,
  SET_CHAT_LOADING,
  SET_CHAT_TARGET_USERNAME,
  SET_CHAT_HISTORY,
} from './_actions';

const setUserlist = (usersOnline) => async (dispatch) => {
  return dispatch({
    type: SET_USERS_ONLINE,
    data: {
      usersOnline: usersOnline,
    },
  });
};

const setChatLoading = (isChatLoading) => async (dispatch) => {
  return dispatch({
    type: SET_CHAT_LOADING,
    data: {
      isChatLoading: isChatLoading,
    },
  });
};

const setChatTargetUserName = (chatTargetUserName) => async (dispatch) => {
  return dispatch({
    type: SET_CHAT_TARGET_USERNAME,
    data: {
      chatTargetUserName: chatTargetUserName,
    },
  });
};

const setChatHistory = (chatHistory) => async (dispatch) => {
  return dispatch({
    type: SET_CHAT_HISTORY,
    data: {
      chatHistory: chatHistory,
    },
  });
};

export { setUserlist, setChatLoading, setChatTargetUserName, setChatHistory };
