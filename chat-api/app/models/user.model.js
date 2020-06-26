const dbPool = require('@lib/db.lib.js');

const userModel = {};

userModel.findByUsername = async (userName) => {
	try {
		const db = await dbPool.get();
		const user = await db
			.table('Users')
			.where('USER_LOGIN', '=', userName)
			.first();

		if (user) {
			return user;
		}
		return null;
	}
	catch (e) {
		console.error('Could not find a user by username', e);
		return null;
	}
};

userModel.createUser = async (userName) => {
	try {
		const db = await dbPool.get();
		return await db
			.table('Users')
			.insert({
				USER_LOGIN: userName,
			});
	}
	catch (e) {
		console.error('Could not find a user by username', e);
		return null;
	}
};

userModel.registerSession = async (userName, socketId) => {
	const user = await userModel.findByUsername(userName);
	const userId = user ? user.USER_ID : await userModel.createUser(
		userName)[0];
	try {
		const db = await dbPool.get();
		return await db
			.table('Sessions')
			.insert({
				USER_ID: userId,
				SOCKET_ID: socketId,
			});
	}
	catch (e) {
		console.error('Could not register session', e);
		return null;
	}
};

userModel.deregisterSession = async (socketId) => {
	try {
		const db = await dbPool.get();
		return await db
			.table('Sessions')
			.where({
				SOCKET_ID: socketId,
			})
			.delete();
	}
	catch (e) {
		console.error('Could not register session', e);
		return null;
	}
};

module.exports = userModel;
