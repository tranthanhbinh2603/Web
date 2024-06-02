const mongoose = require("mongoose");
mongoose
	.connect("mongodb://127.0.0.1:27017/SQLRelationship")
	.then(() => {
		console.log("Connect Successful!");
	})
	.catch((e) => {
		console.log("Error when connect");
		console.log(`This is error: e`);
	});
const Schema = mongoose.Schema;
const userSchema = new Schema({
	name: String,
	age: Number,
	followers: Number,
});
const tweetSchema = new Schema({
	title: String,
	description: String,
	content: String,
	user: { type: Schema.Types.ObjectId, ref: "user" },
});
const User = mongoose.model("user", userSchema);
const Tweet = mongoose.model("tweet", tweetSchema);

const findTweet = async () => {
	const t = await Tweet.find({}).populate("user");
	console.log(t);
};

findTweet();
