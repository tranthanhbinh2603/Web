const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node_topic", "root", "123456", {
	dialect: "mysql",
	host: "localhost",
	logging: false,
});

// Uncomment if you want test connect
// How to test: node <path to file>
// const testConnection = async () => {
// 	try {
// 		await sequelize.authenticate(); // Kiểm tra kết nối
// 		console.log("Connection has been established successfully.");
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// };

// testConnection();

module.exports = sequelize;
