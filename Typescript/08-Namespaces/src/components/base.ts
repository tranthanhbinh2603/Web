namespace App {
	export abstract class BaseComponent<
		T extends HTMLElement,
		U extends HTMLElement
	> {
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
}
