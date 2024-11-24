function wrapAsync(fn) {
	return async function (...args) {
		try {
			return await fn(...args);
		} catch (e) {
			throw e; // Chuyển lỗi lên phía trên để xử lý
		}
	};
}

module.exports = { wrapAsync };
