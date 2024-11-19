const Comment = require("../model/schema");
const io = require("../socket.js");

const getComments = async (req, res) => {
	const allComments = await Comment.find();
	const result = allComments.map((comment) => {
		return comment.comment;
	});
	return res.status(200).json(result);
};

const addComment = async (req, res) => {
	const { comment } = req.body;
	const data = new Comment({
		comment,
	});
	await data.save();
	io.getIO().emit("comment", { action: "create" });
	return res.status(200).json({
		message: "Successful",
	});
};

module.exports = {
	getComments,
	addComment,
};
