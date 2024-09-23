/* */

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

type ListenerType = (items: Project[]) => void;

class ProjectState {
	private listTask: Project[] = [];
	public static instance: ProjectState;
	private listenerList: ListenerType[] = [];

	static getInstance() {
		if (!ProjectState.instance) {
			this.instance = new ProjectState();
		}
		return this.instance;
	}
	private constructor() {}

	addListener(listenerFn: ListenerType) {
		this.listenerList.push(listenerFn);
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
		console.log(this.listTask);
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

class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	formElement: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		this.templateElement = document.querySelector(
			"#project-input"
		)! as HTMLTemplateElement;
		this.hostElement = document.querySelector("#app")! as HTMLDivElement;
		const importNode = document.importNode(this.templateElement.content, true);
		this.formElement = importNode.firstElementChild as HTMLFormElement;
		this.formElement.id = "user-input";
		this.titleInputElement = this.formElement.querySelector(
			"#title"
		)! as HTMLInputElement;
		this.descriptionInputElement = this.formElement.querySelector(
			"#description"
		)! as HTMLInputElement;
		this.peopleInputElement = this.formElement.querySelector(
			"#people"
		)! as HTMLInputElement;
		this.configure();
		this.attach();
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
			console.error("There is some error in input.");
			return;
		}
		projectStateObject.addTask([titleTask, descriptionTask, peopleInTask]);
	}
	@autobind
	formHandler(e: Event) {
		e.preventDefault();
		const dataForm = this.fetchingUserInput();
		if (Array.isArray(dataForm)) {
			console.log(dataForm);
		}
	}
	configure() {
		this.formElement.addEventListener("submit", this.formHandler);
	}
	attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
	}
}

new ProjectInput();

class ProjectList {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLElement;
	assignedTask: Project[] = [];

	constructor(private type: "active" | "finished") {
		this.templateElement = document.getElementById(
			"project-list"
		)! as HTMLTemplateElement;
		this.hostElement = document.getElementById("app")! as HTMLDivElement;

		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);
		projectStateObject.addListener((project: Project[]) => {
			this.assignedTask = project;
			this.renderTask();
		});
		this.element = importedNode.firstElementChild as HTMLElement;
		this.element.id = `${this.type}-projects`;
		this.attach();
		this.renderContent();
	}

	private renderTask() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;
		for (const task of this.assignedTask) {
			const listItem = document.createElement("li");
			listItem.textContent = task.name;
			listEl.appendChild(listItem);
		}
	}

	private renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector("ul")!.id = listId;
		this.element.querySelector("h2")!.textContent =
			this.type.toUpperCase() + " PROJECTS";
	}

	private attach() {
		this.hostElement.insertAdjacentElement("beforeend", this.element);
	}
}

const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
