var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("model/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectType = void 0;
    var ProjectType;
    (function (ProjectType) {
        ProjectType["active"] = "active";
        ProjectType["finished"] = "finished";
    })(ProjectType || (exports.ProjectType = ProjectType = {}));
    class Project {
        constructor(id, name, description, peopleJoin, state) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.peopleJoin = peopleJoin;
            this.state = state;
        }
    }
    exports.Project = Project;
});
define("state/project", ["require", "exports", "model/drag-drop"], function (require, exports, drag_drop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectStateObject = void 0;
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
            const typeProject = objTask[3] || drag_drop_1.ProjectType.active;
            this.listTask.push(new drag_drop_1.Project(id, name, description, peopleJoin, typeProject));
            for (const listenerFn of this.listenerList) {
                listenerFn(this.listTask.slice());
            }
            this.saveListToStorage();
        }
        changeStatus(id, status) {
            const taskFind = this.listTask.find((task) => task.id.toString() === id);
            if (taskFind && taskFind.state != status) {
                taskFind.state = status;
                this.saveListToStorage();
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listenerList) {
                listenerFn(this.listTask.slice());
            }
        }
        saveListToStorage() {
            if (Array.isArray(this.listTask)) {
                localStorage.setItem("taskSave", JSON.stringify(this.listTask));
            }
            else {
                console.error("The provided data is not an array.");
            }
        }
        getListFromStorage() {
            const data = localStorage.getItem("taskSave");
            if (data) {
                try {
                    return JSON.parse(data) || [];
                }
                catch (error) {
                    console.error("Error parsing JSON:", error);
                    return [];
                }
            }
            else {
                console.warn("No data found for the given key.");
                return [];
            }
        }
    }
    exports.projectStateObject = ProjectState.getInstance();
});
define("components/base", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseComponent = void 0;
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
    exports.BaseComponent = BaseComponent;
});
define("utils/validate", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = validate;
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
});
define("utils/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = autobind;
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
});
define("components/projectInput", ["require", "exports", "state/project", "components/base", "utils/validate", "utils/autobind"], function (require, exports, project_1, base_1, validate_1, autobind_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_1.BaseComponent {
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
            if (!(0, validate_1.validate)(listValidateCondition)) {
                alert("There is some error in input.");
                return;
            }
            project_1.projectStateObject.addTask([titleTask, descriptionTask, peopleInTask]);
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
    exports.ProjectInput = ProjectInput;
    __decorate([
        autobind_1.autobind
    ], ProjectInput.prototype, "formHandler", null);
});
define("model/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/projectList", ["require", "exports", "components/base", "utils/autobind", "state/project", "model/drag-drop"], function (require, exports, base_2, autobind_2, project_2, drag_drop_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectTaskRender extends base_2.BaseComponent {
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
        autobind_2.autobind
    ], ProjectTaskRender.prototype, "dragStartHandler", null);
    __decorate([
        autobind_2.autobind
    ], ProjectTaskRender.prototype, "dragEndHandler", null);
    class ProjectList extends base_2.BaseComponent {
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const ulElement = this.element.querySelector("ul");
                ulElement === null || ulElement === void 0 ? void 0 : ulElement.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const id = event.dataTransfer.getData("text/plain");
            project_2.projectStateObject.changeStatus(id, this.type === "active" ? drag_drop_2.ProjectType.active : drag_drop_2.ProjectType.finished);
        }
        dragLeaveHandler(_) {
            const ulElement = this.element.querySelector("ul");
            ulElement === null || ulElement === void 0 ? void 0 : ulElement.classList.remove("droppable");
        }
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedTask = [];
            project_2.projectStateObject.addListener((project) => {
                const listTask = project.filter((item) => {
                    if (type === drag_drop_2.ProjectType.active)
                        return item.state === drag_drop_2.ProjectType.active;
                    else
                        return item.state === drag_drop_2.ProjectType.finished;
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
    exports.ProjectList = ProjectList;
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
});
define("utils/loadTaskFromStorage", ["require", "exports", "state/project"], function (require, exports, project_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoadTasksFromStorage = void 0;
    class LoadTasksFromStorage {
        constructor() {
            this.loadTasks();
        }
        loadTasks() {
            const tasks = project_3.projectStateObject.getListFromStorage();
            if (tasks && Array.isArray(tasks)) {
                for (const task of tasks) {
                    console.log(task);
                    project_3.projectStateObject.addTask([
                        task.name,
                        task.description,
                        task.peopleJoin,
                        task.state,
                    ]);
                }
            }
        }
    }
    exports.LoadTasksFromStorage = LoadTasksFromStorage;
});
define("app", ["require", "exports", "components/projectInput", "components/projectList", "utils/loadTaskFromStorage"], function (require, exports, projectInput_1, projectList_1, loadTaskFromStorage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new projectInput_1.ProjectInput();
    new projectList_1.ProjectList("active");
    new projectList_1.ProjectList("finished");
    new loadTaskFromStorage_1.LoadTasksFromStorage();
});
//# sourceMappingURL=scripts.js.map