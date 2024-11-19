const ClassList = require("../model/ClassList");

const addClass = async (req, res) => {
	try {
		const { className } = req.query;
		console.log(className);
		await ClassList.create({
			className,
		});
		return res.status(200).json({
			message: "successfully",
		});
	} catch {
		return res.status(500).json({
			message: "Something went wrong.",
		});
	}
};

module.exports = { addClass };
