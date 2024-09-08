const parts = ["part-1", "part-2", "part-3", "part-4"];
const isRan = [false, false, false, false];

for (let part = 0; part < parts.length; part++) {
	const partWatcher = scrollMonitor.create(
		document.querySelector(`.${parts[part]}`)
	);

	partWatcher.enterViewport(function () {
		if (!isRan[part]) {
			const timeline = anime.timeline();

			timeline.add({
				targets: `.${parts[part]} svg path`,
				strokeDashoffset: [anime.setDashoffset, -1],
				easing: "easeOutSine",
				duration: 1000,
			});

			timeline.add({
				targets: `.${parts[part]} svg path`,
				fillOpacity: [0, 1],
				easing: "easeOutSine",
				duration: 1000,
			});

			timeline.add(
				{
					targets: `.${parts[part]} svg path`,
					strokeOpacity: [1, 0],
					easing: "easeOutSine",
					duration: 1000,
				},
				"-=1000"
			);
			isRan[part] = true;
		}
	});
}
