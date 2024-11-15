const bcrypt = require("bcrypt");
const User = require("../models/user");
const { bold } = require("kleur");
var jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
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
		console.log(bold().red(`[User Creation Error] ${error.message}`));
		res.status(500).json({ errorCode: 500, message: "Internal server error" });
	}
};

const loginUser = async (req, res) => {
	const { email, password, keepSignedIn } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(401).json({
			errorCode: 401,
			message: "Wrong username/password",
		});
	}
	const userPasswordInDB = user.password;
	const isTruePassword = await bcrypt.compare(password, userPasswordInDB);
	if (!isTruePassword) {
		return res.status(401).json({
			errorCode: 401,
			message: "Wrong username/password",
		});
	}
	const payload = {
		email: email,
	};
	let expiresIn = "900s";
	if (keepSignedIn === true) {
		expiresIn = "30D";
	}
	const jwtToken = jwt.sign(payload, process.env.JWT_KEY, {
		algorithm: "HS256",
		expiresIn,
	});
	return res.status(200).json({
		errorCode: 200,
		token: jwtToken,
	});
};

module.exports = {
	registerUser,
	loginUser,
};
