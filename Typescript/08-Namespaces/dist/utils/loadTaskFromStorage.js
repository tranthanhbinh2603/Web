"use strict";
var App;
(function (App) {
    class LoadTasksFromStorage {
        constructor() {
            this.loadTasks();
        }
        loadTasks() {
            const tasks = App.projectStateObject.getListFromStorage();
            if (tasks && Array.isArray(tasks)) {
                for (const task of tasks) {
                    console.log(task);
                    App.projectStateObject.addTask([
                        task.name,
                        task.description,
                        task.peopleJoin,
                        task.state,
                    ]);
                }
            }
        }
    }
    App.LoadTasksFromStorage = LoadTasksFromStorage;
})(App || (App = {}));
//# sourceMappingURL=loadTaskFromStorage.js.map