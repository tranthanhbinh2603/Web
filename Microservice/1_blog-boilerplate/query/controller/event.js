const { default: axios } = require("axios");
const { myList, addToMyList } = require("../model/schema");

const receiveEvent = (req, res) => {
	const { name, data } = req.body;
	console.log(`Receive Event ${name}, data is ${JSON.stringify(data)}`);
	if (name === "add_post") {
		addToMyList({ ...data, comments: [] });
		axios.post("http://localhost:5099/event/delete");
	} else if (name === "add_comment") {
		const { postId, commentId, content, status } = data;
		let postData = myList.find((item) => item.id === postId);
		if (postData) {
			postData.comments.push({ commentId, content, status });
		} else {
			console.log(`Post with ID ${postId} not found.`);
		}
	} else if (name === "comment_change_status") {
		const { idPost: postId, commentId, status } = data;
		let postData = myList.find((item) => item.id === postId);
		if (!postData) {
			console.log("not found post");
			return res.status(404).json({
				message: "not found post",
			});
		}
		let commentData = postData.comments.find(
			(item) => item.commentId === commentId
		);
		if (!commentData) {
			console.log("not found comment");
			return res.status(404).json({
				message: "not found comment",
			});
		}
		commentData.status = status;
		axios.post("http://localhost:5099/event/delete");
	}

	//! For debug, delete it when product
	console.log(JSON.stringify(myList));
};

module.exports = {
	receiveEvent,
};
