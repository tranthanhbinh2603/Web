let io;

module.exports = {
	init: (httpServer) => {
		io = require("socket.io")(httpServer, {
			cors: {
				origin: "http://localhost:5173", // Địa chỉ frontend
				methods: ["GET", "POST"], // Các phương thức được phép
				allowedHeaders: ["Content-Type"], // Các header được phép
				credentials: true, // Cho phép gửi cookie hoặc các thông tin xác thực
			},
		});
		return io;
	},
	getIO: () => {
		if (!io) {
			throw new Error("Socket.io not initialized!");
		}
		return io;
	},
};
