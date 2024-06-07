const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
	name: {
		type: Schema.Types.ObjectID,
		ref: "User",
	},
	score: String,
	review: String,
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
