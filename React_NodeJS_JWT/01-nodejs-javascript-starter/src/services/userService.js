const bcrypt = require("bcrypt");
const User = require("../models/user");

const createUser = async (req, res) => {
	const { name, email, password, role } = req.body;

	if (role === "") {
		role = "User";
	}

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ errorCode: 400, message: "Email already exists" });
		}

		const data = new User({
			name,
			email,
			password: await bcrypt.hash(password, 10),
			role,
		});

		await data.save();
		res
			.status(201)
			.json({ errorCode: 200, message: "User created successfully" });
	} catch (error) {
		console.log(kleur.bold().red(`[User Creation Error] ${error.message}`));
		res.status(500).json({ errorCode: 500, message: "Internal server error" });
	}
};

module.exports = {
	createUser,
};
