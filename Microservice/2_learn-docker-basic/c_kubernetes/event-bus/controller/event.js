const { default: axios } = require("axios");

const eventList = [];

const setEvent = (req, res) => {
	const event = req.body;

	eventList.push(event);

	axios.post("http://post-srv:5050/event", event).catch((err) => {
		console.log(err.message);
	});
	axios.post("http://localhost:5051/event", event).catch((err) => {
		console.log(err.message);
	});
	axios.post("http://localhost:5053/event", event).catch((err) => {
		console.log(err.message);
	});
	axios.post("http://localhost:5054/event", event).catch((err) => {
		console.log(err.message);
	});

	return res.status(200).json({
		message: "successful",
	});
};

const getEvents = (req, res) => {
	res.status(200).json(eventList);
};

const deleteEvents = (req, res) => {
	eventList.pop();
	return res.status(200).json({
		message: "successful",
	});
};

module.exports = {
	setEvent,
	getEvents,
	deleteEvents,
};
