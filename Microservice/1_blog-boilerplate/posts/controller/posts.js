const { genID } = require("../utils/utils");

const posts = [];

const getPosts = (req, res) => {
	return res.status(200).json(posts);
};
const addPosts = (req, res) => {
	const { title } = req.body;
	posts.push({
		id: genID(),
		title,
	});
	return res.status(201).json({
		message: "successful",
	});
};

module.exports = { getPosts, addPosts };
