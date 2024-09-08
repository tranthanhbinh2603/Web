const timeline = anime.timeline();

timeline.add({
	targets: "svg rect",
	strokeDashoffset: [anime.setDashoffset, 0],
	easing: "easeOutSine",
	duration: 400,
});

timeline.add({
	targets: "svg rect",
	opacity: [1, 0],
	easing: "easeOutSine",
	duration: 400,
});

timeline.add(
	{
		targets: ".image img",
		opacity: [0.001, 1],
		easing: "easeOutSine",
		duration: 400,
	},
	"-=400"
);

timeline.add(
	{
		targets: ".title h1",
		opacity: [0.001, 1],
		easing: "easeOutSine",
		duration: 400,
	},
	"-=400"
);

timeline.add(
	{
		targets: ".description p",
		opacity: [0.001, 1],
		easing: "easeOutSine",
		duration: 400,
	},
	"-=400"
);
