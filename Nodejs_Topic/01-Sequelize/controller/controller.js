const User = require("../model/schema");

const addPerson = (req, res) => {
	const { firstName, lastName, age } = req.query;
	User.create({
		firstName,
		lastName,
		age,
	});
	return res.status(200).json({
		message: "successfully",
	});
};

const exportPersons = async (req, res) => {
	try {
		const users = await User.findAll();
		return res.status(200).json(users.map((user) => user.toJSON()));
	} catch {
		return res.status(500).json({
			message: "Something went wrong.",
		});
	}
};

const exportOnePeople = async (req, res) => {
	try {
		const idRequest = req.query.id;
		//Cách 1
		// const user = await User.findByPk(idRequest);
		// return res.status(200).json(user.toJSON());
		//Cách 2
		const user = await User.findAll({
			where: {
				id: idRequest,
			},
		});
		return res.status(200).json(user[0].toJSON());
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Something went wrong.",
		});
	}
};

module.exports = {
	addPerson,
	exportPersons,
	exportOnePeople,
};
