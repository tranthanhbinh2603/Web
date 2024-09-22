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
		return [titleTask, descriptionTask, peopleInTask];
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
