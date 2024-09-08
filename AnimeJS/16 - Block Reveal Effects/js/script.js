const timeline = anime.timeline();
const rectangle = document.querySelector(".main .rectangle");
const text = document.querySelector(".main .text");
rectangle.style.transform = "scaleX(0)"; //Không được thêm vào CSS vì nó sẽ không chạy được

timeline.add({
	targets: rectangle,
	scaleX: 1,
	duration: 400,
	easing: "easeInOutQuint",
	complete: () => {
		rectangle.style.transformOrigin = "100% 50%";
		text.style.color = "gray";
		anime({
			targets: rectangle,
			scaleX: 0,
			duration: 400,
			delay: 200,
			easing: "easeInOutQuint",
		});
	},
});
