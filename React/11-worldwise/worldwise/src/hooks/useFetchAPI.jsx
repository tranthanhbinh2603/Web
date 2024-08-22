// How to use:

// const callback = useCallback(() => {
//     console.log("Fetch API called");
// }, []);

// const [ data, isLoading, error ] = useFetchAPI(link, callback);

// import { useState, useEffect } from "react";

// export function useFetchAPI(link, callback) {
// 	const [data, setData] = useState([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState("");
// 	useEffect(
// 		function () {
// 			callback?.();
// 			const controller = new AbortController();
// 			async function fetchAPI() {
// 				try {
// 					setIsLoading(true);
// 					setError("");
// 					const res = await fetch(link, { signal: controller.signal });
// 					if (!res.ok) setError("Something went wrong with fetching");
// 					const resultFinal = await res.json();
// 					setData(resultFinal);
// 					setError("");
// 				} catch (err) {
// 					if (err.name !== "AbortError") {
// 						setError(err.message);
// 					}
// 				} finally {
// 					setIsLoading(false);
// 				}
// 			}
// 			fetchAPI();
// 			return function () {
// 				controller.abort();
// 			};
// 		},
// 		[link, callback]
// 	);
// 	return [data, isLoading, error];
// }

import { useState, useEffect, useCallback } from "react";

export function useFetchAPI(initialLink, initialCallback) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [link] = useState(initialLink);
	const [callback] = useState(initialCallback);
	const [reload, setReload] = useState(0);

	const loadAgain = useCallback(() => {
		setReload((prevReload) => prevReload + 1); // Tăng giá trị reload để trigger useEffect
	}, []);

	useEffect(() => {
		callback?.();
		if (!link) return;
		const controller = new AbortController();
		async function fetchAPI() {
			try {
				setIsLoading(true);
				setError("");
				const res = await fetch(link, { signal: controller.signal });
				if (!res.ok) {
					throw new Error("Something went wrong with fetching");
				}
				const resultFinal = await res.json();
				setData(resultFinal);
				setError("");
			} catch (err) {
				if (err.name !== "AbortError") {
					setError(err.message);
				}
			} finally {
				setIsLoading(false);
			}
		}
		fetchAPI();
		return () => {
			controller.abort();
		};
	}, [link, reload, callback]);

	return [data, isLoading, error, loadAgain];
}
