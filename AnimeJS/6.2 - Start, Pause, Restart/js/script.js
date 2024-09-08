const startButton = document.querySelector(".btn-start");
const pauseButton = document.querySelector(".btn-pause");
const restartButton = document.querySelector(".btn-restart");

const cd1 = anime({
	targets: ".btn-target",
	rotate: 720,
	marginLeft: 500,
	duration: 3000,
	autoplay: false,
	complete: () => {
		startButton.classList.add("visually-hidden");
		pauseButton.classList.add("visually-hidden");
		restartButton.classList.remove("visually-hidden");
	},
});

startButton.addEventListener("click", () => {
	startButton.classList.add("visually-hidden");
	pauseButton.classList.remove("visually-hidden");

	cd1.play();
});

pauseButton.addEventListener("click", () => {
	startButton.classList.remove("visually-hidden");
	pauseButton.classList.add("visually-hidden");

	cd1.pause();
});

restartButton.addEventListener("click", () => {
	pauseButton.classList.remove("visually-hidden");
	restartButton.classList.add("visually-hidden");

	cd1.restart();
});
