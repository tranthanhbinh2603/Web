var cd3 = anime({
	targets: ".display-3 span",
	translateY: 200,
	duration: function (el, i) {
		return i * 100 + 100;
	},
	delay: function (el, i) {
		return i * 100;
	},
	direction: "alternate",
	loop: true,
	elasticity: 20,
	duration: 1000,
	delay: 200,
});
