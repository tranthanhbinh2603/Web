/*
	
*/

interface Draggable {
	dragStartHandler(event: DragEvent): void; // Được gọi khi bắt đầu kéo một đối tượng (khi người dùng bắt đầu kéo).
	dragEndHandler(event: DragEvent): void; // Được gọi khi kết thúc việc kéo (khi người dùng thả chuột và ngừng kéo đối tượng).
}

interface DragTarget {
	dragOverHandler(event: DragEvent): void; // Được gọi khi một đối tượng đang được kéo qua vùng thả (drop target) để xác định đây là vùng hợp lệ cho phép thả.
	dropHandler(event: DragEvent): void; // Được gọi khi đối tượng được thả vào vùng thả (drop target), dùng để xử lý việc thả và cập nhật dữ liệu/giao diện.
	dragLeaveHandler(event: DragEvent): void; // Được gọi khi một đối tượng kéo ra khỏi vùng thả mà không thả vào (khi rời khỏi vùng thả), thường để hủy bỏ các thay đổi giao diện.
}

enum ProjectType {
	active = "active",
	finished = "finished",
}

class Project {
	constructor(
		public id: number,
		public name: string,
		public description: string,
		public peopleJoin: number,
		public state: ProjectType
	) {}
}
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

	addTask(objTask: [string, string, number]) {
		const id = Date.now();
		const name = objTask[0];
		const description = objTask[1];
		const peopleJoin = objTask[2];
		this.listTask.push(
			new Project(id, name, description, peopleJoin, ProjectType.active)
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

const projectStateObject = ProjectState.getInstance();

interface ValidateInterface {
	value: string | number;
	require: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

function validate(objList: ValidateInterface[]) {
	let isValid = true;

	for (const obj of objList) {
		if (obj.require) {
			isValid =
				isValid &&
				obj.value !== "" &&
				obj.value !== null &&
				obj.value !== undefined;
		}

		if (!isValid) {
			break;
		}

		if (typeof obj.value === "string") {
			if (obj.minLength != null) {
				isValid = isValid && obj.value.length >= obj.minLength;
			}
			if (obj.maxLength != null) {
				isValid = isValid && obj.value.length <= obj.maxLength;
			}
		}

		if (typeof obj.value === "number") {
			if (obj.min != null) {
				isValid = isValid && obj.value >= obj.min;
			}
			if (obj.max != null) {
				isValid = isValid && obj.value <= obj.max;
			}
		}

		if (!isValid) {
			break;
		}
	}

	return isValid;
}

function autobind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;

	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};

	return adjDescriptor;
}

abstract class BaseComponent<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	hostElement: U;
	element: T;

	constructor(
		templateId: string,
		hostElementId: string,
		insertAtStart: boolean,
		newElementId?: string
	) {
		this.templateElement = document.getElementById(
			templateId
		)! as HTMLTemplateElement;
		this.hostElement = document.getElementById(hostElementId)! as U;

		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);
		this.element = importedNode.firstElementChild as T;
		if (newElementId) {
			this.element.id = newElementId;
		}

		this.attach(insertAtStart);
	}

	private attach(insertAtStart: boolean) {
		this.hostElement.insertAdjacentElement(
			insertAtStart ? "afterbegin" : "beforeend",
			this.element
		);
	}

	abstract configure(): void;
	abstract renderContent(): void;
}

class ProjectInput extends BaseComponent<HTMLFormElement, HTMLDivElement> {
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		super("project-input", "app", true, "user-input");

		this.titleInputElement = this.element.querySelector(
			"#title"
		)! as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector(
			"#description"
		)! as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector(
			"#people"
		)! as HTMLInputElement;

		this.configure();
	}

	fetchingUserInput(): [string, string, number] | undefined {
		const titleTask = this.titleInputElement.value;
		const descriptionTask = this.descriptionInputElement.value;
		const peopleInTask = parseInt(this.peopleInputElement.value);
		const listValidateCondition: ValidateInterface[] = [
			{
				value: titleTask,
				require: true,
				minLength: 5,
				maxLength: 50,
			},
			{
				value: descriptionTask,
				require: true,
				minLength: 10,
				maxLength: 500,
			},
			{
				value: peopleInTask,
				require: true,
				min: 0,
				max: 10,
			},
		];
		if (!validate(listValidateCondition)) {
			alert("There is some error in input.");
			return;
		}
		projectStateObject.addTask([titleTask, descriptionTask, peopleInTask]);
	}

	@autobind
	formHandler(e: Event) {
		e.preventDefault();
		this.fetchingUserInput();
	}

	configure() {
		this.element.addEventListener("submit", this.formHandler);
	}

	renderContent() {}
}

new ProjectInput();

class ProjectTaskRender
	extends BaseComponent<HTMLUListElement, HTMLLIElement>
	implements Draggable
{
	private project: Project;

	get persons() {
		if (this.project.peopleJoin === 1) {
			return "1 person";
		} else {
			return `${this.project.peopleJoin} persons`;
		}
	}

	constructor(hostId: string, project: Project) {
		super("single-project", hostId, false, project.id.toString());
		this.project = project;

		this.configure();
		this.renderContent();
	}

	@autobind
	dragStartHandler(event: DragEvent) {
		event.dataTransfer!.setData("text/plain", this.project.id.toString());
		event.dataTransfer!.effectAllowed = "move";
	}

	@autobind
	dragEndHandler(_: DragEvent) {}

	configure() {
		this.element.addEventListener("dragstart", this.dragStartHandler);
		this.element.addEventListener("dragend", this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector("h2")!.textContent = this.project.name;
		this.element.querySelector("h3")!.textContent = this.persons + " assigned";
		this.element.querySelector("p")!.textContent = this.project.description;
	}
}

class ProjectList
	extends BaseComponent<HTMLElement, HTMLDivElement>
	implements DragTarget
{
	assignedTask: Project[] = [];

	@autobind
	dragOverHandler(event: DragEvent) {
		if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
			event.preventDefault();
			const ulElement = this.element.querySelector("ul")!;
			ulElement?.classList.add("droppable");
		}
	}
	@autobind
	dropHandler(event: DragEvent) {
		const id = event.dataTransfer!.getData("text/plain");
		projectStateObject.changeStatus(
			id,
			this.type === "active" ? ProjectType.active : ProjectType.finished
		);
	}

	@autobind
	dragLeaveHandler(_: DragEvent) {
		const ulElement = this.element.querySelector("ul")!;
		ulElement?.classList.remove("droppable");
	}

	constructor(private type: "active" | "finished") {
		super("project-list", "app", false, `${type}-projects`);
		projectStateObject.addListener((project: Project[]) => {
			const listTask = project.filter((item) => {
				if (type === ProjectType.active)
					return item.state === ProjectType.active;
				else return item.state === ProjectType.finished;
			});
			this.assignedTask = listTask;
			this.renderTask();
		});

		this.renderContent();
		this.configure();
	}

	private renderTask() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;
		listEl.innerHTML = "";
		for (const prjItem of this.assignedTask) {
			new ProjectTaskRender(this.element.querySelector("ul")!.id, prjItem);
		}
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector("ul")!.id = listId;
		this.element.querySelector("h2")!.textContent =
			this.type.toUpperCase() + " PROJECTS";
	}

	configure() {
		this.element.addEventListener("dragover", this.dragOverHandler);
		this.element.addEventListener("dragleave", this.dragLeaveHandler);
		this.element.addEventListener("drop", this.dropHandler);
	}
}

const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");

class LoadTasksFromStorage {
	constructor() {
		this.loadTasks();
	}

	private loadTasks() {
		const tasks = projectStateObject.getListFromStorage();
		if (tasks && Array.isArray(tasks)) {
			for (const task of tasks) {
				projectStateObject.addTask([
					task.name,
					task.description,
					task.peopleJoin,
				]);
			}
		}
	}
}

new LoadTasksFromStorage();
