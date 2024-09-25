import { projectStateObject } from "../state/project";

export class LoadTasksFromStorage {
	constructor() {
		this.loadTasks();
	}

	private loadTasks() {
		const tasks = projectStateObject.getListFromStorage();
		if (tasks && Array.isArray(tasks)) {
			for (const task of tasks) {
				console.log(task);
				projectStateObject.addTask([
					task.name,
					task.description,
					task.peopleJoin,
					task.state,
				]);
			}
		}
	}
}
