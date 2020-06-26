const dbPool = require('@lib/db.lib.js');
const { v4 } = require('uuid');

const userModel = {
	// in memory storage
	tokens: {},
};

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

userModel.findBySocketId = async (socketId) => {
	try {
		const db = await dbPool.get();
		return await db
			.select([ 'Users.USER_LOGIN', 'Users.USER_ID' ])
			.table('Sessions')
			.leftJoin(
				'Users',
				'Sessions.USER_ID',
				'Users.USER_ID',
			)
			.where(
				'Sessions.SOCKET_ID', '=', socketId,
			)
			.first();
	}
	catch (e) {
		console.error('Could not get userlist', e);
		return null;
	}
};

userModel.getUserlist = async (socketId) => {
	try {
		const currentUser = await userModel.findBySocketId(socketId);
		if (!currentUser) {
			console.error('This should never happen', socketId);
			return [];
		}
		const db = await dbPool.get();
		return await db
			.select(
				[
					'Users.USER_ID',
					'Users.USER_LOGIN',
				])
			.select(db.raw(
				'count(case when `Messages`.`MESSAGE_SEEN` = 0 AND `Messages`.`TO_USER_ID` = 1 then `Messages`.`MESSAGE_ID` end ) as `UNSEEN` '))
			.table('Sessions')
			.leftJoin(
				'Users',
				'Sessions.USER_ID',
				'Users.USER_ID',
			)
			.leftJoin(
				'Messages',
				'Messages.FROM_USER_ID',
				'Users.USER_ID',
			)
			.groupBy('Users.USER_ID')
			.where(
				'Sessions.USER_ID', '!=', currentUser.USER_ID,
			);
	}
	catch (e) {
		console.error('Could not get userlist', e);
		return null;
	}
};

userModel.registerSession = async (userName, socketId) => {
	const user = await userModel.findByUsername(userName);
	let userId = null;
	if (user === null) {
		userId = await userModel.createUser(userName);
	}
	else {
		userId = user.USER_ID;
	}

	try {
		const db = await dbPool.get();
		const token = v4();
		await db
			.table('Sessions')
			.insert({
				USER_ID: userId,
				SOCKET_ID: socketId,
				SESSION_TOKEN: token,
			});
		// register in memory
		userModel.tokens[socketId] = token;
		return token;
	}
	catch (e) {
		console.error('Could not register session', e);
		return null;
	}
};

userModel.deregisterSession = async (socketId) => {
	try {
		const db = await dbPool.get();
		delete userModel.tokens[socketId];
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
