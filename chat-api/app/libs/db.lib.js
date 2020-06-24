const knex = require('knex');

const db = {
	connection: null,
};

db.get = async () => {
	if (db.connection) {
		return await db.connection;
	}

	// eslint-disable-next-line
	db.connection = await db.createConnection();
	return db.connection;
};

db.createConnection = async (serviceName = null) => {

	try {
		const db = await knex({
			client: 'mysql2',
			debug: false,
			connection: {
				host: process.env.MYSQL_HOSTNAME || 'Chat_DB',
				port: '3306',
				user: process.env.MYSQL_USER || 'root',
				password: process.env.MYSQL_PASSWORD || '',
				database: process.env.MYSQL_DATABASE || 'chat-db',
				charset: 'utf8',
			},
			pool: {
				min: 1,
				max: 10,
				afterCreate: (connection, callback) => {
					// eslint-disable-next-line no-console
					connection.query('SELECT 1;', [], (err) => {
						if (err) {
							// eslint-disable-next-line no-console
							console.log(err);
						}

						callback(err, connection);
					});
				},
			},
		});
		return db;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		return new Error(error);
	}
};

module.exports = db;
