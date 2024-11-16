const User = require("../models/user");
const { bold } = require("kleur");
var jwt = require("jsonwebtoken");

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

const getInfoUser = async (req, res) => {
	try {
		const authToken = req.headers["authorization"].split(" ")[1];
		if (!authToken) {
			return res.status(401).json({
				errorCode: 401,
				message: "Unauthorized",
			});
		}
		return res.status(200).json(
			jwt.verify(authToken, process.env.JWT_KEY, {
				algorithms: ["HS256"],
			})
		);
	} catch (error) {
		return res.status(401).json({
			errorCode: 401,
			message: "Unauthorized",
		});
	}
};

module.exports = {
	getUsers,
	getInfoUser,
};
