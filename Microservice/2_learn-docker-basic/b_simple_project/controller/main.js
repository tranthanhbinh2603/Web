const data = [];

const addData = (req, res) => {
	data.push(req.body);
	return res.status(200).json({
		message: "successful",
	});
};
const getData = (req, res) => {
	return res.status(200).json(data);
};

module.exports = {
	addData,
	getData,
};
