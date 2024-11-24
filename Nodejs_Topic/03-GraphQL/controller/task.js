const { Task } = require("../model/schema");

const addTask = async (req, res) => {
	try {
		const { title, description, status, priority, dueDate } = req.query;
		const task = new Task({ title, description, status, priority, dueDate });
		await task.save();
		return res.status(200).json({
			message: "successful",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const getAllTasks = async (req, res) => {
	try {
		const data = await Task.find({});
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const editTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, status, priority, dueDate } = req.query;
		await Task.findByIdAndUpdate(
			id,
			{ title, description, status, priority, dueDate },
			{
				runValidators: true,
				new: true,
			}
		);
		return res.status(200).json({
			message: "successful",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		await Task.findByIdAndDelete(id);
		return res.status(200).json({
			message: "successful",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

module.exports = {
	addTask,
	getAllTasks,
	editTask,
	deleteTask,
};
