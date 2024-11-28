const { default: axios } = require("axios");

const moderationComment = async (dataEvent) => {
	if (!dataEvent) {
		return;
	}
	const { name, data } = dataEvent;
	if (name === "add_comment") {
		const { postId: idPost, commentId, content } = data;
		const isApprove = content.toString().includes("orange")
			? "reject"
			: "approve";
		await axios.post("http://localhost:5099/event/delete");
		await axios
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
	moderationComment,
};
