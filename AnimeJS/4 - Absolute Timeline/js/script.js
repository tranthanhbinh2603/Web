const timeline = anime.timeline();

timeline.add({
	targets: ".nut1",
	translateX: [{ value: 200, duration: 1000 }],
});

timeline.add(
	{
		targets: ".nut2",
		translateX: [{ value: 200, duration: 1000 }],
	},
	"-=1000ms" //Relative
);

timeline.add({
	targets: ".nut3",
	translateX: [{ value: 200, duration: 1000 }],
});

timeline.add(
	{
		targets: ".nut4",
		translateX: [{ value: 200, duration: 1000 }],
	},
	500 //Absolute
);
