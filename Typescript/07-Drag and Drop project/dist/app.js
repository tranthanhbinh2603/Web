"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
class ProjectInput {
    constructor() {
        this.templateElement = document.querySelector("#project-input");
        this.hostElement = document.querySelector("#app");
        this.hostElement = document.querySelector("#app");
        this.hostElement = document.querySelector("#app");
        const importNode = document.importNode(this.templateElement.content, true);
        this.formElement = importNode.firstElementChild;
        this.formElement.id = "user-input";
        this.titleInputElement = this.formElement.querySelector("#title");
        this.descriptionInputElement = this.formElement.querySelector("#description");
        this.peopleInputElement = this.formElement.querySelector("#people");
        this.configure();
        this.attach();
    }
    formHandler(e) {
        e.preventDefault();
        console.log(this.titleInputElement.value);
    }
    configure() {
        this.formElement.addEventListener("submit", this.formHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "formHandler", null);
new ProjectInput();
//# sourceMappingURL=app.js.map