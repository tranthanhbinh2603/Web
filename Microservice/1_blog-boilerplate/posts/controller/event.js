const receiveEvent = (req, res) => {
	const { name } = req.body;
	console.log(`Receive Event ${name}`);
};

module.exports = {
	receiveEvent,
};
