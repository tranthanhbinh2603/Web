"use strict";
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList("active");
    new App.ProjectList("finished");
    new App.LoadTasksFromStorage();
})(App || (App = {}));
//# sourceMappingURL=app.js.map