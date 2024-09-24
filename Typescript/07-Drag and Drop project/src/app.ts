/*
	
*/

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

class ProjectTaskRender {
	private static persons(numberPeople: number): string {
		if (numberPeople === 1) {
			return "1 people";
		} else {
			return numberPeople + " peoples";
		}
	}
	static Render(idRender: string, listTask: Project[]) {
		const listEl = document.getElementById(idRender)! as HTMLUListElement;
		listEl.innerHTML = "";
		for (const task of listTask) {
			const listItem = document.createElement("li");

			const h2 = document.createElement("h2");
			h2.textContent = task.name;
			listItem.appendChild(h2);

			const h3 = document.createElement("h3");
			h3.textContent = this.persons(task.peopleJoin) + " assigned";
			listItem.appendChild(h3);

			const p = document.createElement("p");
			p.textContent = task.description;
			listItem.appendChild(p);

			listEl.appendChild(listItem);
		}
	}
}

class ProjectList extends BaseComponent<HTMLElement, HTMLDivElement> {
	assignedTask: Project[] = [];

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
	}

	private renderTask() {
		ProjectTaskRender.Render(`${this.type}-projects-list`, this.assignedTask);
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector("ul")!.id = listId;
		this.element.querySelector("h2")!.textContent =
			this.type.toUpperCase() + " PROJECTS";
	}

	configure() {}
}

const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
