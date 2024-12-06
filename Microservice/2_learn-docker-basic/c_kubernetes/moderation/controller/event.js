const { default: axios } = require("axios");
const { moderationComment } = require("../utils/moderationComment");

const receiveEvent = (req, res) => {
	moderationComment(req.body);
};

module.exports = {
	receiveEvent,
};
