const { default: axios } = require("axios");

const receiveEvent = (req, res) => {
	const { name, data } = req.body;
	console.log(`Receive Event ${name}, data is ${JSON.stringify(data)}`);
	if (name === "add_comment") {
		const { postId: idPost, commentId, content } = data;
		const isApprove = content.toString().includes("orange")
			? "reject"
			: "approve";
		axios
			.post("http://localhost:5099/event", {
				name: "comment_change_status",
				data: {
					idPost,
					commentId,
					content,
					status: isApprove,
				},
			})
			.catch((err) => {
				console.log(err.message);
			});
	}
};

module.exports = {
	receiveEvent,
};
