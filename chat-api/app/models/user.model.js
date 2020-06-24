const dbPool = require('@lib/db.lib.js');

const userModel = {};

userModel.getUserByUsername = async (userName) => {
	try {
		const db = await dbPool.get();
		const storyDb =
				  db
					  .table('Users')
					  .where('USER_LOGIN', '=', userName);
		return await storyDb.first();
	}
	catch (error) {
		console.error(error);
		return false;
	}
};

module.exports = userModel;
