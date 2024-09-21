class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	formElement: HTMLFormElement;

	constructor() {
		this.templateElement = document.querySelector(
			"#project-input"
		)! as HTMLTemplateElement;
		this.hostElement = document.querySelector("#app")! as HTMLDivElement;
		const importNode = document.importNode(this.templateElement.content, true);
		this.formElement = importNode.firstElementChild as HTMLFormElement;
		this.attach();
	}
	attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
	}
}

new ProjectInput();
