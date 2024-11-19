const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const ClassList = sequelize.define("ClassList", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	className: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = ClassList;
