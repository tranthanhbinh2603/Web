const { genID } = require("../utils/utils");

const listComment = {};

const getComments = (req, res) => {
	return res.status(200).json(listComment);
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
