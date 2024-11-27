let myList = [];

module.exports = {
	myList,

	setMyList(value) {
		if (Array.isArray(value)) {
			myList = value;
		} else {
			throw new Error("Value must be an array");
		}
	},

	addToMyList(item) {
		myList.push(item);
	},

	mapMyList(callback) {
		return myList.map(callback);
	},

	filterMyList(callback) {
		return myList.filter(callback);
	},
};
