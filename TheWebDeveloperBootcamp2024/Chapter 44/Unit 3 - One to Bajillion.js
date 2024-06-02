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
const User = mongoose.model("user", userSchema);
// const createUser = async () => {
// 	const user1 = new User({
// 		name: "Binh",
// 		age: 20,
// 		followers: 1000,
// 	});
// 	const user2 = new User({
// 		name: "Phúc",
// 		age: 50,
// 		followers: 100000,
// 	});
// 	await user1.save();
// 	await user2.save();
// };

// createUser();

const tweetSchema = new Schema({
	title: String,
	description: String,
	content: String,
	user: {
		type: Schema.Types.ObjectID,
		ref: "User",
	},
	// ref fill by name of schema variable
	// Example: If you have "const User = mongoose.model("user", userSchema);", fill ref is "User"
});

const Tweet = mongoose.model("tweet", tweetSchema);

const createTweets = async () => {
	const firstUser = await User.findOne({ name: "Binh" }).then((res) => {
		return res;
	});
	const secondUser = await User.findOne({ name: "Phúc" }).then((res) => {
		return res;
	});
	const tweet1 = new Tweet({
		title: "First tweet",
		description: "This is the first tweet",
		content: "Lorem ipsum dolor sit amet",
	});
	tweet1.user = firstUser;
	const tweet2 = new Tweet({
		title: "Second tweet",
		description: "This is the second tweet",
		content: "Consectetur adipiscing elit",
	});
	tweet2.user = secondUser;
	await tweet1.save();
	await tweet2.save();
};

createTweets();
