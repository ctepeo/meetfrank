import socketIOClient from 'socket.io-client';
import env from '_config/env.config.jsx';
import { store } from '_utils/configureStore';
import { signedIn } from '_app/actions/signin.actions';

const socket = {
  handler: null,
};

socket.connect = async () => {
  try {
    socket.handler = await socketIOClient(env.api);
    socket.handler.on('signin', async (response) => {
      if (response.success) {
        await store.dispatch(signedIn());
      }
      else {
        console.error('Could not sign in', response);
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
  console.log(`Sending socket message [${channel}]: ${message}`);
  return await socket.handler.emit(channel, message);
};

socket.sendSignIn = async (userName) => {
  return await socket.emitMessage('signin', userName);
};

export default socket;
