const User = require("../models/user");
const { bold } = require("kleur");

const getUsers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password");
		return res.status(200).json(users);
	} catch (error) {
		console.log(bold().red(`[Get All Users] ${error.message}`));
		return res.status(404).json({
			errorCode: 404,
			message: "Have error when get all users",
		});
	}
};

module.exports = {
	getUsers,
};
