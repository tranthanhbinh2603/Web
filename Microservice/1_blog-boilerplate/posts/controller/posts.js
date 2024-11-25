const { genID } = require("../utils/utils");

const getPosts = (req, res) => {
	return res.status(200).json({
		message: "successful",
	});
};
const addPosts = (req, res) => {
	const { title } = req.body;
	return res.status(201).json({
		id: genID(),
		title,
		message: "successful",
	});
};

module.exports = { getPosts, addPosts };
