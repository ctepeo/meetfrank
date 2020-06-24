const express = require('express');
const router = new express.Router();
const userModel = require('@model/user.model.js');
const Joi = require('@hapi/joi');

const validationSchemas = {
	signIn: Joi.object().keys({
		username: Joi.string().required().min(1),
	}),
};

router.post('/signin',
	async (req, res, next) => {

		const { error } = validationSchemas.signIn.validate(req.body);
		const valid = error == null;

		if (valid) {
			next();
		}
		else {
			const { details } = error;
			const message = details.map(i => i.message).join(',');

			return res.status(422).json({ error: message });
		}
	},
	async (req, res) => {
		try {
			const user = await userModel.getUserByUsername(req.body.username);
			return res.status(200).json({
				'routed': false,
				user,
			});
		}
		catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
);

module.exports = router;
