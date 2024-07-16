export default function Stats({ items }) {
	const countItem = items.length;
	if (countItem === 0) {
		return (
			<footer className="stats">
				<em>Please input at least 1 item</em>
			</footer>
		);
	}
	const countTickItem = items.filter((item) => item.packed).length;
	const percentFinish = Math.round((countTickItem / countItem) * 100);
	return (
		<footer className="stats">
			<em>
				{percentFinish === 100
					? "You ready to go"
					: `You have ${countItem} element in your list, and you already packed ${countTickItem} (${percentFinish}%)`}
			</em>
		</footer>
	);
}
