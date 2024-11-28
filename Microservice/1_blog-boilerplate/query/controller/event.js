const { myList, addToMyList } = require("../model/schema");

const receiveEvent = (req, res) => {
	const { name, data } = req.body;
	console.log(`Receive Event ${name}, data is ${JSON.stringify(data)}`);
	if (name === "add_post") addToMyList({ ...data, comments: [] });
	else if (name === "add_comment") {
		const { postId, commentId, content, status } = data;
		let postData = myList.find((item) => item.id === postId);
		if (postData) {
			postData.comments.push({ commentId, content, status });
		} else {
			console.log(`Post with ID ${postId} not found.`);
		}
	}
	//! For debug, delete it when production
	console.log(JSON.stringify(myList));
};

module.exports = {
	receiveEvent,
};
