import {
  SET_CHAT_LOADING,
  SET_USERS_ONLINE,
  SET_CHAT_TARGET_USERNAME,
  SET_CHAT_HISTORY,
} from '../actions/_actions';

const initState = {
  usersOnline: null,
  isChatLoading: false,
  chatId: null,
  chatHistory: null,
  chatTargetUserName: '...',
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USERS_ONLINE:
      return {
        ...state,
        usersOnline: action.data.usersOnline,
      };
    case SET_CHAT_LOADING:
      return {
        ...state,
        isChatLoading: action.data.isChatLoading,
      };
    case SET_CHAT_TARGET_USERNAME:
      return {
        ...state,
        chatTargetUserName: action.data.chatTargetUserName,
      };
    case SET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.data.chatHistory,
      };
    default:
      return state;
  }
};

export default chatReducer;
