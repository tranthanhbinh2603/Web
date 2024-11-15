var jwt = require("jsonwebtoken");

const checkAuthentication = (req, res, next) => {
	try {
		const authToken = req.headers["authorization"].split(" ")[1];
		if (!authToken) {
			return res.status(401).json({
				errorCode: 401,
				message: "Unauthorized",
			});
		}
		jwt.verify(authToken, process.env.JWT_KEY, {
			algorithm: "HS256",
		});
		next();
	} catch (error) {
		return res.status(401).json({
			errorCode: 401,
			message: "Unauthorized",
		});
	}
};

module.exports = checkAuthentication;
