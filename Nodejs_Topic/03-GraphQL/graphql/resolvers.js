const { Task } = require("../model/schema");
const { AppError } = require("../utils/AppError");
const { wrapAsync } = require("../utils/wrapAsync");

module.exports = {
	getTask: wrapAsync(async () => {
		const data = await Task.find({});
		return data;
	}),
	createTask: wrapAsync(async (args, req, next) => {
		const { title, description, status, priority, dueDate } = args.taskInput;
		if (title.length < 5) {
			throw new AppError("Title less than 5 letters", 300);
		}
		const task = new Task({ title, description, status, priority, dueDate });
		const taskReturnData = await task.save();
		return taskReturnData;
	}),
};
