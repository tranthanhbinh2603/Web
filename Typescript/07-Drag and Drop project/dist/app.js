"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectType;
(function (ProjectType) {
    ProjectType["active"] = "active";
    ProjectType["finished"] = "finished";
})(ProjectType || (ProjectType = {}));
class Project {
    constructor(id, name, description, peopleJoin, state) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.peopleJoin = peopleJoin;
        this.state = state;
    }
}
class State {
    constructor() {
        this.listenerList = [];
    }
    addListener(listenerFn) {
        this.listenerList.push(listenerFn);
    }
}
class ProjectState extends State {
    static getInstance() {
        if (!ProjectState.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    constructor() {
        super();
        this.listTask = [];
    }
    addTask(objTask) {
        const id = Date.now();
        const name = objTask[0];
        const description = objTask[1];
        const peopleJoin = objTask[2];
        this.listTask.push(new Project(id, name, description, peopleJoin, ProjectType.active));
        for (const listenerFn of this.listenerList) {
            listenerFn(this.listTask.slice());
        }
    }
    changeStatus(id, status) {
        const taskFind = this.listTask.find((task) => task.id.toString() === id);
        if (taskFind) {
            taskFind.state = status;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listenerList) {
            listenerFn(this.listTask.slice());
        }
    }
}
const projectStateObject = ProjectState.getInstance();
function validate(objList) {
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
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class BaseComponent {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtStart) {
        this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}
class ProjectInput extends BaseComponent {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    fetchingUserInput() {
        const titleTask = this.titleInputElement.value;
        const descriptionTask = this.descriptionInputElement.value;
        const peopleInTask = parseInt(this.peopleInputElement.value);
        const listValidateCondition = [
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
    formHandler(e) {
        e.preventDefault();
        this.fetchingUserInput();
    }
    configure() {
        this.element.addEventListener("submit", this.formHandler);
    }
    renderContent() { }
}
__decorate([
    autobind
], ProjectInput.prototype, "formHandler", null);
new ProjectInput();
class ProjectTaskRender extends BaseComponent {
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
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    autobind
], ProjectTaskRender.prototype, "dragStartHandler", null);
__decorate([
    autobind
], ProjectTaskRender.prototype, "dragEndHandler", null);
class ProjectList extends BaseComponent {
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const ulElement = this.element.querySelector("ul");
            ulElement === null || ulElement === void 0 ? void 0 : ulElement.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const id = event.dataTransfer.getData("text/plain");
        projectStateObject.changeStatus(id, this.type === "active" ? ProjectType.active : ProjectType.finished);
    }
    dragLeaveHandler(_) {
        const ulElement = this.element.querySelector("ul");
        ulElement === null || ulElement === void 0 ? void 0 : ulElement.classList.remove("droppable");
    }
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedTask = [];
        projectStateObject.addListener((project) => {
            const listTask = project.filter((item) => {
                if (type === ProjectType.active)
                    return item.state === ProjectType.active;
                else
                    return item.state === ProjectType.finished;
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
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeaveHandler", null);
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
//# sourceMappingURL=app.js.map