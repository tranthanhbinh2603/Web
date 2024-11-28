const receiveEvent = (req, res) => {
	const { name, data } = req.body;
	console.log(`Receive Event ${name}, data is ${JSON.stringify(data)}`);
};

module.exports = {
	receiveEvent,
};
