'use strict';
require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const apiPort = process.env.APP_PORT || 80;

(async () => {
		try {

			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({ extended: false }));

			// routes
			app.use('/v1', require('@route/v1/v1.index.routes.js'));

			app.listen(apiPort, () => {
				// eslint-disable-next-line no-console
				console.info(`Server is listening on port ${apiPort}`);
			});

			// sockets handling
			io.on('connection', (socket) => {
				console.log('a user connected');
			});

		}
		catch (error) {
			// eslint-disable-next-line no-console
			console.error('[INDEX] > CRASHED DURING BOOTSTRAP', error);
		}
	}
)();

