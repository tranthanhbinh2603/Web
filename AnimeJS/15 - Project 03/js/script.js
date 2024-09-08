const button = document.querySelector(".den p");
const front_layer = document.querySelector(".den");
const svg_picture = document.querySelector(".den svg");
const svg_picture_path = document.querySelector(".den svg path");
const close = document.querySelector(".trang .close");

button.addEventListener("click", () => {
	// front_layer.classList.toggle("di-len");

	anime({
		targets: front_layer,
		translateY: "-200%",
		easing: "easeOutSine",
		duration: 500,
	});

	anime(
		{
			targets: svg_picture,
			scaleY: [
				{ duration: 500, value: [0.4, 4], easing: "easeInSine" },
				{ duration: 500, value: [4, 0.4], easing: "easeInSine" },
			],
		},
		"-=500"
	);

	anime(
		{
			targets: svg_picture_path,
			easing: "easeOutSine",
			duration: 500,
			d: "M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z",
		},
		"-=500"
	);
});

close.addEventListener("click", () => {
	// front_layer.classList.toggle("di-len");

	anime({
		targets: front_layer,
		translateY: "0%",
		easing: "easeOutSine",
		duration: 500,
		// direction: "reserve",
	});
});

window.addEventListener(
	"wheel",
	(event) => {
		event.preventDefault();

		let scrollLimit = 0.01; // Giới hạn cuộn tối đa cho mỗi lần cuộn
		let lastScrollY = window.scrollY; // Vị trí cuộn hiện tại

		let scrollAmount =
			Math.min(Math.abs(event.deltaY), scrollLimit) * Math.sign(event.deltaY);

		window.scrollBy(0, scrollAmount);

		lastScrollY = window.scrollY;

		if (event.deltaY < 0) {
			const transform = window.getComputedStyle(front_layer).transform;
			if (transform !== "none") {
				const matrix = transform.split("(")[1].split(")")[0].split(",");
				const translateY = matrix[5]?.trim();
				if (translateY !== "0" && translateY !== "0px") {
					front_layer.style.transform = "translateY(0)";
				} else {
					event.preventDefault();
				}
			} else {
				event.preventDefault();
			}
		} else if (event.deltaY > 0) {
			const transform = window.getComputedStyle(front_layer).transform;
			if (transform !== "none") {
				const matrix = transform.split("(")[1].split(")")[0].split(",");
				const translateY = matrix[5]?.trim();
				if (translateY === "0" || translateY === "0px") {
					button.click();
				} else {
					event.preventDefault();
				}
			} else {
				button.click();
				event.preventDefault();
			}
		}
	},
	{ passive: false }
);
