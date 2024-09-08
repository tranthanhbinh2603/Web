const timeline = anime.timeline();

timeline.add({
	targets: "svg rect",
	strokeDashoffset: [anime.setDashoffset, 0],
	easing: "easeOutSine",
	duration: 500,
});

timeline.add({
	targets: "svg rect",
	opacity: [1, 0],
	easing: "easeOutSine",
	duration: 500,
});

timeline.add(
	{
		targets: ".block-1 img",
		opacity: [0, 1],
		easing: "linear",
		duration: 500,
	},
	"-=500ms"
);

timeline.add(
	{
		targets: ".block-2-1 h3",
		opacity: [0, 1],
		easing: "linear",
		duration: 500,
	},
	"-=500ms"
);

timeline.add(
	{
		targets: ".block-2-2 p",
		opacity: [0, 1],
		easing: "linear",
		duration: 500,
	},
	"-=500ms"
);

timeline.add(
	{
		targets: ".block-2",
		backgroundColor: ["#FFFFFF", "#FB8C00"],
		easing: "linear",
		duration: 500,
	},
	"-=500ms"
);
