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

		this.hostElement = document.querySelector("#app")! as HTMLDivElement;
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
	@autobind
	formHandler(e: Event) {
		e.preventDefault();
		console.log(this.titleInputElement.value);
	}
	configure() {
		this.formElement.addEventListener("submit", this.formHandler);
	}
	attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
	}
}

new ProjectInput();
