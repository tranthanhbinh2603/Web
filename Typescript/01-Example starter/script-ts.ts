const txt1 = document.querySelector(".i1")! as HTMLInputElement;
const txt2 = document.querySelector(".i2")! as HTMLInputElement;
const btn = document.querySelector(".btn");

function add(num1: number, num2: number) {
	return (num1 + num2) * 3;
}

if (btn) {
	btn.addEventListener("click", () => {
		console.log(add(+txt1.value, +txt2.value)); //Ép kiểu trong javascript từ kiểu chuổi sang kiểu số
	});
}
