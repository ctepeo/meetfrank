const dbPool = require('@lib/db.lib.js');
const postman = {};

postman.getAllOnlineSockets = async () => {
	try {

		const db = await dbPool.get();
		return await db
			.table('Sessions');
	}
	catch (e) {
		console.error('Could not find a user by username', e);
		return null;
	}
};

module.exports = postman;
