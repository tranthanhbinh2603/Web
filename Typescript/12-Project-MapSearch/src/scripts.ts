const formElement = document.querySelector("form")! as HTMLFormElement;
const inputElement = document.querySelector(".input")! as HTMLFormElement;

function handleSummit(event: SubmitEvent) {
	event.preventDefault();
	console.log(inputElement.value);
}

formElement.addEventListener("submit", handleSummit);
