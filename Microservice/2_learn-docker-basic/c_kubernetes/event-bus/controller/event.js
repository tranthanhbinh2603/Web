const { default: axios } = require("axios");

const eventList = [];

const setEvent = (req, res) => {
	const event = req.body;

	eventList.push(event);

	axios.post("http://comment-srv:5051/event", event).catch((err) => {
		console.log("Comment event: ", err.message);
	});
	axios.post("http://query-srv:5053/event", event).catch((err) => {
		console.log("Query event: ", err.message);
	});
	axios.post("http://moderation-srv:5054/event", event).catch((err) => {
		console.log("Moderation event: ", err.message);
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
