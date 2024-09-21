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
		this.titleInputElement = document.querySelector(
			"#title"
		)! as HTMLInputElement;
		this.descriptionInputElement = document.querySelector(
			"#description"
		)! as HTMLInputElement;
		this.peopleInputElement = document.querySelector(
			"#people"
		)! as HTMLInputElement;
		this.hostElement = document.querySelector("#app")! as HTMLDivElement;
		this.hostElement = document.querySelector("#app")! as HTMLDivElement;
		const importNode = document.importNode(this.templateElement.content, true);
		this.formElement = importNode.firstElementChild as HTMLFormElement;
		this.formElement.id = "user-input";
		this.configure();
		this.attach();
	}
	formHandler(e: Event) {
		e.preventDefault();
		console.log(this.titleInputElement.value);
	}
	configure() {
		this.formElement.addEventListener("submit", this.formHandler.bind(this));
	}
	attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
	}
}

new ProjectInput();
