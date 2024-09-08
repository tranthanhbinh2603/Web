const timeline = anime.timeline();

timeline.add({
	targets: ".nut1",
	translateX: [{ value: 200, duration: 1000 }],
	marginTop: 400,
	rotate: "180deg",
});
