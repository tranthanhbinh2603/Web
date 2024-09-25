"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    class ProjectInput extends App.BaseComponent {
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
            if (!App.validate(listValidateCondition)) {
                alert("There is some error in input.");
                return;
            }
            App.projectStateObject.addTask([titleTask, descriptionTask, peopleInTask]);
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
        App.autobind
    ], ProjectInput.prototype, "formHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
//# sourceMappingURL=projectInput.js.map