const { default: axios } = require("axios");
const { moderationComment } = require("../utils/moderationComment");

const receiveEvent = (req, res) => {
	moderationComment(res.body);
};

module.exports = {
	receiveEvent,
};
