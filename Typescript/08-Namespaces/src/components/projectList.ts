namespace App {
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
			this.element.querySelector("h3")!.textContent =
				this.persons + " assigned";
			this.element.querySelector("p")!.textContent = this.project.description;
		}
	}

	export class ProjectList
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
}
