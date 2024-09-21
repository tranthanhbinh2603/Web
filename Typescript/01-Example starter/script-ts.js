"use strict";
const txt1 = document.querySelector(".i1");
const txt2 = document.querySelector(".i2");
const btn = document.querySelector(".btn");
function add(num1, num2) {
    return (num1 + num2) * 3;
}
if (btn) {
    btn.addEventListener("click", () => {
        console.log(add(+txt1.value, +txt2.value));
    });
}
//# sourceMappingURL=script-ts.js.map