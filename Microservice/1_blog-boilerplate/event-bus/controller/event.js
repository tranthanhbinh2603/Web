const { default: axios } = require("axios");

const setEvent = (req, res) => {
	const event = req.body;

	axios.post("http://localhost:5050/event", event).catch((err) => {
		console.log(err.message);
	});
	axios.post("http://localhost:5051/event", event).catch((err) => {
		console.log(err.message);
	});
	axios.post("http://localhost:5053/event", event).catch((err) => {
		console.log(err.message);
	});

	res.status(200).json({
		message: "successful",
	});
};

module.exports = {
	setEvent,
};
