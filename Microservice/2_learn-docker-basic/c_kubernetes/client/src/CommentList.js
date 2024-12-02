import React from "react";

const CommentList = ({ listComments }) => {
	const renderedComments = listComments.map((comment) => {
		return (
			<li key={comment.commentId}>
				{comment.status === "pending" ? (
					<i>This comment awaiting moderation</i>
				) : comment.status === "reject" ? (
					<i>This comment was rejected</i>
				) : comment.status === "approve" ? (
					comment.content
				) : (
					<i>Something went wrong</i>
				)}
			</li>
		);
	});

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
