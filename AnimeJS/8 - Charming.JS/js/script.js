const pElement = document.querySelector("h3 b");
const smallElement = document.querySelector("h3 small");

charming(pElement, {
	classPrefix: "letter",
});

charming(smallElement, {
	classPrefix: "letter",
});

const cd1 = anime({
	targets: "h3 b span",
	opacity: [0, 1],
	translateY: [-30, 0],
	delay: function (el, i) {
		return i * 50;
	},
	loop: true,
	direction: "alternate",
});

smallElement.addEventListener("mouseenter", () => {
	anime.remove(smallElement);
	anime({
		targets: "h3 small span",
		opacity: [0, 1],
		translateY: [10, 0],
		color: "#1E88E5",
		delay: function (el, i) {
			return i * 10;
		},
	});
});

smallElement.addEventListener("mouseleave", () => {
	anime.remove(smallElement);
	anime({
		targets: "h3 small span",
		opacity: [0, 1],
		duration: 500,
		color: "#263238",
		translateY: [-10, 0],
		delay: function (el, i) {
			return i * 10;
		},
	});
});
