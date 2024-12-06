const { default: axios } = require("axios");
const { genID } = require("../utils/utils");

const posts = [];

const getPosts = (req, res) => {
	return res.status(200).json(posts);
};

const addPosts = (req, res) => {
	const { title } = req.body;
	const id = genID();
	posts.push({
		id,
		title,
	});
	axios.post("http://event-bus-srv:5099/event", {
		name: "add_post",
		data: {
			id,
			title,
		},
	});
	return res.status(201).json({
		message: "successful",
	});
};

module.exports = { getPosts, addPosts };
