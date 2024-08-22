import { useState } from "react";

function SlowComponent() {
	// If this is too slow on your maching, reduce the `length`
	const words = Array.from({ length: 30_000 }, () => "WORD");
	return (
		<ul>
			{words.map((word, i) => (
				<li key={i}>
					{i}: {word}
				</li>
			))}
		</ul>
	);
}
//Not optimize
// export default function Test() {
// 	const [count, setCount] = useState(0);
// 	return (
// 		<div>
// 			<h1>Slow counter?!?</h1>
// 			<button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
// 			<SlowComponent />
// 		</div>
// 	);
// }

//Optimize:
function Counter({ children }) {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h1>Slow counter?!?</h1>
			<button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
			{children}
		</div>
	);
}

export default function Test() {
	return (
		<Counter>
			<SlowComponent />
		</Counter>
	);
}
