import socketIOClient from 'socket.io-client';
import env from '_config/env.config.jsx';
import { store } from '_utils/configureStore';
import { signedIn } from '_app/actions/signin.actions';
import {
  setUserlist,
  setChatHistory,
  setChatLoading,
} from '_app/actions/chat.actions';

const socket = {
  handler: null,
  token: 'a96ee71c-c458-4ee2-9397-5c428b47287a',
};

socket.connect = async () => {
  try {
    socket.handler = await socketIOClient(env.api);

    socket.handler.on('signin', async (response) => {
      if (response.success && response.token) {
        socket.token = response.token;
        await store.dispatch(signedIn(response.token));
      }
      else {
        console.error('Could not sign in', response);
      }
    });

    socket.handler.on('oops', async (response) => {
      console.error('[OOPS]', response);
    });

    socket.handler.on('online', async (response) => {
      await store.dispatch(setUserlist(response.userlist));
    });

    socket.handler.on('chat', async (response) => {
      await store.dispatch(setChatHistory(response.chat));
      await store.dispatch(setChatLoading(false));
      const seenMsgs = [];
      for (let i in response.chat) {
        const msg = response.chat[i];
        if (msg.MESSAGE_SEEN == 0) {
          seenMsgs.push(msg.MESSAGE_ID);
        }
      }
      if (seenMsgs.length) {
        return await socket.emitMessage('seenMessage', {
          token: socket.token,
          messages: seenMsgs
        });
      }
    });

    return socket.handler;
  }
  catch (e) {
    console.error(e);
  }
};

/**
 *
 * @param channel
 * @param message
 * @returns {Promise<*>}
 */
socket.emitMessage = async (channel, message) => {
  console.log(
    `Sending socket message [${channel}]: ${JSON.stringify(message)}`);
  return await socket.handler.emit(channel, message);
};

socket.sendSignIn = async (userName) => {
  return await socket.emitMessage('signin', userName);
};

socket.fetchUsersOnline = async () => {
  return await socket.emitMessage('online', {
    token: socket.token,
  });
};

socket.fetchChatHistory = async (chatId) => {
  return await socket.emitMessage('chat', {
    token: socket.token,
    chatId: chatId,
  });
};

socket.sendChatMessage = async (message, chatId) => {
  return await socket.emitMessage('sendMessage', {
    token: socket.token,
    message: message,
    chatId: chatId,
  });
};

export default socket;
