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
	const listCommentCurrent = listComment[idPost] || [];
	listCommentCurrent.push({ id: genID(), content });
	listComment[idPost] = listCommentCurrent;
	return res.status(201).json({
		message: "successful",
	});
};
module.exports = {
	getComments,
	addComment,
};
