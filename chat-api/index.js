'use strict';
require('module-alias/register');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const userModel = require('@model/user.model.js');
const chatModel = require('@model/chat.model.js');

const apiPort = process.env.APP_PORT || 80;

(async () => {
	try {

		const isRequestValid = (socketId, request) => {
			return true;
			return request.token && userModel.tokens[socketId] &&
				userModel.tokens[socketId] == request.token;
		};

		// sockets handling
		io.on('connection', (socket) => {
			console.log(`connected ${socket.id}`);
			socket.on('signin', async (userName) => {
				const token = await userModel.registerSession(userName,
					socket.id,
				);

				socket.emit('signin', {
					success: true,
					token: token,
				});
			});

			socket.on('online', async (data) => {
				if (!isRequestValid(socket.id, data)) {
					return socket.emit('oops', {
						success: false,
						message: 'Invalid token',
					});
				}
				const userList = await userModel.getUserlist(
					'cTbuKhdYGPEVs2M9AAAC');
				socket.emit('online', {
					success: true,
					userlist: userList,
				});
			});

			socket.on('chat', async (data) => {
				if (!isRequestValid(socket.id, data) || !data.chatId) {
					return socket.emit('oops', {
						success: false,
						message: 'Invalid token',
					});
				}
				const chatHistory = await chatModel.getChatHistory(
					'cTbuKhdYGPEVs2M9AAAC', data.chatId);
				socket.emit('chat', {
					success: true,
					chat: chatHistory,
				});
			});

			socket.on('sendMessage', async (data) => {
				if (!isRequestValid(socket.id, data) || !data.chatId) {
					return socket.emit('oops', {
						success: false,
						message: 'Invalid token',
					});
				}
				const messageId = await chatModel.addMessage(
					'cTbuKhdYGPEVs2M9AAAC', data.chatId, data.message);
			});

			socket.on('disconnect', async () => {
				console.log(`disconnected ${socket.id}`);
				await userModel.deregisterSession(
					socket.id,
				);
			});
		});

		server.listen(apiPort, () => {
			// eslint-disable-next-line no-console
			console.info(`Server is listening on port ${apiPort}`);
		});

	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.error('[INDEX] > CRASHED DURING BOOTSTRAP', error);
	}
})();

