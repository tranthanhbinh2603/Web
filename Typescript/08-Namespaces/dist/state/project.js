"use strict";
var App;
(function (App) {
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
            const typeProject = objTask[3] || App.ProjectType.active;
            this.listTask.push(new App.Project(id, name, description, peopleJoin, typeProject));
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
    App.projectStateObject = ProjectState.getInstance();
})(App || (App = {}));
//# sourceMappingURL=project.js.map