const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username must not blank"],
	},
	password: {
		type: String,
		required: [true, "Password must not blank"],
	},
});
userSchema.statics.findAndValidate = async function (user, pass) {
	const userFound = await this.findOne({ username: user });
	if (!userFound) {
		return false;
	}
	const isValidAccount = await bcrypt.compare(pass, userFound.password);
	return isValidAccount ? userFound : false;
};
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(12);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});
module.exports = mongoose.model("user", userSchema);
