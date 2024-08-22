import { useState, useEffect } from "react";
export function useFetchAPI(link) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(
		function () {
			const controller = new AbortController();
			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError("");
					const res = await fetch(`${link}`, { signal: controller.signal });
					if (!res.ok) throw new Error("Something went wrong with fetching");
					const data = await res.json();
					setData(data);
					setError("");
				} catch (err) {
					if (err.name !== "AbortError") {
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}
			fetchMovies();
			return function () {
				controller.abort();
			};
		},
		[link]
	);
	return { data, isLoading, error };
}
