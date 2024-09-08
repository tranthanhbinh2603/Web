const startButton = document.querySelector(".btn-start");
const statusElement = document.querySelector(".status");

startButton.addEventListener("click", () => {
	startButton.disabled = true;
	anime({
		targets: ".btn-target",
		rotate: 720,
		marginLeft: 500,
		duration: 3000,
		update: (data) => {
			startButton.innerHTML =
				"Đã chạy được" +
				Math.round(data.currentTime) +
				"ms, " +
				Math.round(data.progress) +
				"%";
		},
		begin: () => {
			statusElement.innerHTML = "Chuyển động đã được bắt đầu";
		},
		complete: () => {
			statusElement.innerHTML = "Đã chạy xong";
		},
	});
});
