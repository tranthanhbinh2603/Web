import mongoose from "mongoose";
import { Password } from "../utils/password";

interface UserAttrs {
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<any> {
	build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});
userSchema.pre("save", async function (done) {
	if (this.isModified("password")) {
		const hashed = await Password.toHash(this.get("password"));
		this.set("password", hashed);
	}
	done();
});
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
