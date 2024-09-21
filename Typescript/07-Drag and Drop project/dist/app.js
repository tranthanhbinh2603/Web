"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.querySelector("#project-input");
        this.hostElement = document.querySelector("#app");
        const importNode = document.importNode(this.templateElement.content, true);
        this.formElement = importNode.firstElementChild;
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}
new ProjectInput();
//# sourceMappingURL=app.js.map