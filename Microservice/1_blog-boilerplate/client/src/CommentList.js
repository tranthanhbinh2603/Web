import React from "react";

const CommentList = ({ listComments }) => {
	const renderedComments = listComments.map((comment) => {
		return <li key={comment.commentId}>{comment.content}</li>;
	});

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
