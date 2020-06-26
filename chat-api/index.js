'use strict';
require('module-alias/register');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const userModel = require('@model/user.model.js');

const apiPort = process.env.APP_PORT || 80;

(async () => {
		try {

			// sockets handling
			io.on('connection', (socket) => {
				console.log(`connected ${socket.id}`);
				socket.on('signin', async (userName) => {
					await userModel.registerSession(userName,
						socket.id,
					);

					socket.emit('signin', {
						success: true,
					});
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
	}
)();

