"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    class ProjectTaskRender extends App.BaseComponent {
        get persons() {
            if (this.project.peopleJoin === 1) {
                return "1 person";
            }
            else {
                return `${this.project.peopleJoin} persons`;
            }
        }
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id.toString());
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id.toString());
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_) { }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.name;
            this.element.querySelector("h3").textContent =
                this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        App.autobind
    ], ProjectTaskRender.prototype, "dragStartHandler", null);
    __decorate([
        App.autobind
    ], ProjectTaskRender.prototype, "dragEndHandler", null);
    class ProjectList extends App.BaseComponent {
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const ulElement = this.element.querySelector("ul");
                ulElement === null || ulElement === void 0 ? void 0 : ulElement.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const id = event.dataTransfer.getData("text/plain");
            App.projectStateObject.changeStatus(id, this.type === "active" ? App.ProjectType.active : App.ProjectType.finished);
        }
        dragLeaveHandler(_) {
            const ulElement = this.element.querySelector("ul");
            ulElement === null || ulElement === void 0 ? void 0 : ulElement.classList.remove("droppable");
        }
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedTask = [];
            App.projectStateObject.addListener((project) => {
                const listTask = project.filter((item) => {
                    if (type === App.ProjectType.active)
                        return item.state === App.ProjectType.active;
                    else
                        return item.state === App.ProjectType.finished;
                });
                this.assignedTask = listTask;
                this.renderTask();
            });
            this.renderContent();
            this.configure();
        }
        renderTask() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedTask) {
                new ProjectTaskRender(this.element.querySelector("ul").id, prjItem);
            }
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
        }
    }
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
//# sourceMappingURL=projectList.js.map