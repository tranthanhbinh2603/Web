// const target = <HTMLInputElement>document.querySelector("p");
const target = document.querySelector("p");

if (target) {
	(target as HTMLInputElement).innerText = "123";
}
