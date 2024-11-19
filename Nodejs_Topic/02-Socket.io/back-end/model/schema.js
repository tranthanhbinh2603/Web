const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const commentSchema = new Schema({
	comment: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 500,
	},
});
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
