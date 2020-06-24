const express = require('express');
const router = new express.Router();

router.get('/', async (req, res) => {
	try {
		res.status(200).json({ 'hello': 'world' });
	}
	catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.use(require('@route/v1/auth.routes.js'));

module.exports = router;
