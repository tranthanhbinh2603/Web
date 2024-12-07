const { default: axios } = require("axios");
const { genID } = require("../utils/utils");

const listComment = {};

const getComments = (req, res) => {
	const { id } = req.params;
	const listCommentResult = listComment[id] || [];
	return res.status(200).json(listCommentResult);
};
const addComment = (req, res) => {
	const { id: idPost } = req.params;
	const { content } = req.body;
	const commentId = genID();
	const listCommentCurrent = listComment[idPost] || [];
	listCommentCurrent.push({ id: commentId, content, status: "pending" });
	listComment[idPost] = listCommentCurrent;
	axios.post("http://localhost:5099/event", {
		name: "add_comment",
		data: {
			postId: idPost,
			commentId,
			content,
			status: "pending",
		},
	});
	return res.status(201).json({
		message: "successful",
	});
};
module.exports = {
	getComments,
	addComment,
};
