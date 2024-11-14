const bcrypt = require("bcrypt");
const User = require("../models/user");

createUser = async (req, res) => {
	const { name, email, password, role } = req.body;
	const data = new User({
		name,
		email,
		password: await bcrypt.hash(password, 10),
		role,
	});
	await data.save();
	res.status(201).json({ data });
};

module.exports = {
	createUser,
};
