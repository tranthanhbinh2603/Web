Array.from(document.querySelectorAll(".btn")).map((item) => {
	const duration = parseInt(item.getAttribute("data-duration")) || 0;
	const iterationCount =
		parseInt(item.getAttribute("data-iterationCount")) || 0;
	const delay = parseInt(item.getAttribute("data-delay")) || 0;

	anime({
		targets: item,
		translateX: 200,
		duration: duration,
		loop: iterationCount,
		delay: delay,
	});
});
