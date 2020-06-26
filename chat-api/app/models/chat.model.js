const dbPool = require('@lib/db.lib.js');
const userModel = require('@model/user.model.js');
const chatModel = {};

chatModel.getChatHistory = async (socketId, chatId) => {
	try {
		const currentUser = await userModel.findBySocketId(socketId);
		const db = await dbPool.get();
		return await db
			.table('Messages')
			.where({
				'FROM_USER_ID': currentUser.USER_ID,
				'TO_USER_ID': chatId,
			})
			.orWhere({
				'FROM_USER_ID': chatId,
				'TO_USER_ID': currentUser.USER_ID,
			})
			.orderBy('MESSAGE_TIMESTAMP', 'DESC')
			.limit(1000);

	}
	catch (e) {
		console.error('Could not find a user by username', e);
		return null;
	}
};

chatModel.addMessage = async (socketId, chatId, message) => {
	try {
		const currentUser = await userModel.findBySocketId(socketId);
		const db = await dbPool.get();
		return await db
			.table('Messages')
			.insert({
				FROM_USER_ID: currentUser.USER_ID,
				TO_USER_ID: chatId,
				MESSAGE_TEXT: message,
			});
	}
	catch (e) {
		console.error('Could not find a user by username', e);
		return null;
	}
};

chatModel.seenMessages = async (socketId, messagesIds) => {
	try {
		const currentUser = await userModel.findBySocketId(socketId);
		const db = await dbPool.get();
		return await db
			.table('Messages')
			.update({
				MESSAGE_SEEN: 1,
			})
			.where('TO_USER_ID', currentUser.USER_ID)
			.whereIn('MESSAGE_ID', messagesIds);
	}
	catch (e) {
		console.error('Could not find a user by username', e);
		return null;
	}
};

module.exports = chatModel;
