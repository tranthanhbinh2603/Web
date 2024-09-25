namespace App {
	type ListenerType<T> = (items: T[]) => void;

	class State<T> {
		listenerList: ListenerType<T>[] = [];
		addListener(listenerFn: ListenerType<T>) {
			this.listenerList.push(listenerFn);
		}
	}

	class ProjectState extends State<Project> {
		private listTask: Project[] = [];
		public static instance: ProjectState;

		static getInstance() {
			if (!ProjectState.instance) {
				this.instance = new ProjectState();
			}
			return this.instance;
		}
		private constructor() {
			super();
		}

		addTask(objTask: [string, string, number, ProjectType?]) {
			const id = Date.now();
			const name = objTask[0];
			const description = objTask[1];
			const peopleJoin = objTask[2];
			const typeProject = objTask[3] || ProjectType.active; // Sử dụng giá trị mặc định nếu không được truyền

			this.listTask.push(
				new Project(id, name, description, peopleJoin, typeProject)
			);

			for (const listenerFn of this.listenerList) {
				listenerFn(this.listTask.slice());
			}

			this.saveListToStorage();
		}

		changeStatus(id: String, status: ProjectType) {
			const taskFind = this.listTask.find((task) => task.id.toString() === id);
			if (taskFind && taskFind.state != status) {
				taskFind.state = status;
				this.saveListToStorage();
				this.updateListeners();
			}
		}

		updateListeners() {
			for (const listenerFn of this.listenerList) {
				listenerFn(this.listTask.slice());
			}
		}

		private saveListToStorage() {
			if (Array.isArray(this.listTask)) {
				localStorage.setItem("taskSave", JSON.stringify(this.listTask));
			} else {
				console.error("The provided data is not an array.");
			}
		}

		getListFromStorage() {
			const data = localStorage.getItem("taskSave");
			if (data) {
				try {
					return (JSON.parse(data) as Project[]) || [];
				} catch (error) {
					console.error("Error parsing JSON:", error);
					return [];
				}
			} else {
				console.warn("No data found for the given key.");
				return [];
			}
		}
	}

	export const projectStateObject = ProjectState.getInstance();
}
