// document.getElementById("moveButton").addEventListener("click", function () {
// 	var box = document.getElementById("animatedBox");
// 	box.classList.toggle("move-right");
// });

var cd1 = anime({
	targets: ".btn",
	translateX: [
		{ value: "100px", duration: 700, delay: 300 }, //Keyframe 1
		{ value: "200px", duration: 700, delay: 300 }, //Keyframe 2
	],
	translateY: [
		{ value: "100px", duration: 700, delay: 300 }, //Keyframe 1
		{ value: "200px", duration: 700, delay: 300 }, //Keyframe 2
		{ value: "300px", duration: 700, delay: 300 }, //Keyframe 3
	],
});
