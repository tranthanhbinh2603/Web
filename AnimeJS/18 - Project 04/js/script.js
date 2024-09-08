const wrap = (element) => {
	element.classList.add("main");
	const newContent = '<div class="text">' + element.innerHTML + "</div>";
	element.innerHTML = newContent;
	element.insertAdjacentHTML("beforeend", '<div class="rectangle"></div>');
	const rectangle = element.querySelector(".main .rectangle");
	const text = element.querySelector(".main .text");
	rectangle.style.transform = "scaleX(0)";
	anime({
		targets: rectangle,
		scaleX: 1,
		duration: 400,
		easing: "easeInOutQuint",
		complete: () => {
			rectangle.style.transformOrigin = "100% 50%";
			text.style.opacity = 1;
			anime({
				targets: rectangle,
				scaleX: 0,
				duration: 400,
				delay: 200,
				easing: "easeInOutQuint",
			});
		},
	});
};

const watcher = (element) => {
	const partWatcher = scrollMonitor.create(element);
	partWatcher.enterViewport(function () {
		wrap(element);
		partWatcher.destroy(); //Dùng dòng này nếu như có lỗi lặp đi lặp lại chạy element
	});
};

watcher(document.querySelector("#e1"));
watcher(document.querySelector("#e2"));
watcher(document.querySelector("#e3"));
