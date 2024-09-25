"use strict";
var App;
(function (App) {
    let ProjectType;
    (function (ProjectType) {
        ProjectType["active"] = "active";
        ProjectType["finished"] = "finished";
    })(ProjectType = App.ProjectType || (App.ProjectType = {}));
    class Project {
        constructor(id, name, description, peopleJoin, state) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.peopleJoin = peopleJoin;
            this.state = state;
        }
    }
    App.Project = Project;
})(App || (App = {}));
//# sourceMappingURL=modelNamespace.js.map