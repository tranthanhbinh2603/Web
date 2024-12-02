const { myList } = require("../model/schema");

const getPosts = (req, res) => {
	return res.status(200).json(myList);
};

module.exports = {
	getPosts,
};
