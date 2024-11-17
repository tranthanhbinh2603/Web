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
		const idRequest = req.params.id;
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

const editPeople = async (req, res) => {
	const idRequest = req.params.id;
	const { firstName, lastName, age } = req.query;
	await User.findByPk(idRequest)
		.then((product) => {
			firstName ? (product.firstName = firstName) : product.firstName;
			lastName ? (product.lastName = lastName) : product.lastName;
			age ? (product.age = age) : product.age;
			product.save();
		})
		.then(() => {
			return res.status(200).json({
				message: "successfully",
			});
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = {
	addPerson,
	exportPersons,
	exportOnePeople,
	editPeople,
};
