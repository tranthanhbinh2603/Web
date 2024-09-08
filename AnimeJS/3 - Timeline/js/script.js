const timeline = anime.timeline();

timeline.add({
	targets: ".nut1",
	translateX: [{ value: 200, duration: 1000 }],
});

timeline.add({
	targets: ".nut2",
	translateX: [{ value: 200, duration: 1000 }],
	easing: "linear",
});

timeline.add({
	targets: ".nut3",
	translateX: [
		{ value: 200, duration: 1000, easing: "easeInOutQuad" },
		{ value: 300, duration: 1000 },
	],
});

timeline.add({
	targets: ".nut4",
	translateX: [{ value: 200, duration: 1000 }],
	easing: "easeOutInQuad",
});
