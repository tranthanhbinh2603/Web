const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	status: {
		type: String,
		enum: ["pending", "in_progress", "completed"],
		default: "pending",
	},
	priority: {
		type: String,
		enum: ["low", "medium", "high"],
		default: "medium",
	},
	dueDate: { type: String },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = {
	Task,
};
