import { projectStateObject } from "../state/project";
import { BaseComponent } from "./base";
import { ValidateInterface, validate } from "../utils/validate";
import { autobind } from "../utils/autobind";

export class ProjectInput extends BaseComponent<
	HTMLFormElement,
	HTMLDivElement
> {
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
