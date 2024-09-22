"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
class ProjectInput {
    constructor() {
        this.templateElement = document.querySelector("#project-input");
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
            console.error("There is some error in input.");
            return;
        }
        return [titleTask, descriptionTask, peopleInTask];
    }
    formHandler(e) {
        e.preventDefault();
        const dataForm = this.fetchingUserInput();
        if (Array.isArray(dataForm)) {
            console.log(dataForm);
        }
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