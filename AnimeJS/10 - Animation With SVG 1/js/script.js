const timeline = anime.timeline({ loop: true });

timeline.add({
	targets: ".main-line",
	strokeDashoffset: [anime.setDashoffset, 0],
	duration: 1000,
	delay: (el, i) => {
		return i * 10;
	},
	easing: "easeOutSine",
	direction: "alternative",
});

timeline.add({
	targets: ".arrow-1",
	strokeDashoffset: [anime.setDashoffset, 0],
	duration: 200,
	delay: (el, i) => {
		return i * 10;
	},
	easing: "easeOutSine",
	direction: "alternative",
});

timeline.add({
	targets: ".arrow-2",
	strokeDashoffset: [anime.setDashoffset, 0],
	duration: 200,
	delay: (el, i) => {
		return i * 10;
	},
	easing: "easeOutSine",
	direction: "alternative",
});
