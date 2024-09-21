const txt1 = document.querySelector(".i1");
const txt2 = document.querySelector(".i2");
const btn = document.querySelector(".btn");

function add(num1, num2) {
	return num1 + num2;
}

btn.addEventListener("click", () => {
	console.log(add(+txt1.value, +txt2.value)); //Ép kiểu trong javascript từ kiểu chuổi sang kiểu số
});
