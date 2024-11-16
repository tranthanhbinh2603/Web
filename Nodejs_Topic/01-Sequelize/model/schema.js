const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const User = sequelize.define("User", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
	},
	age: {
		type: DataTypes.INTEGER,
	},
});

module.exports = User;
