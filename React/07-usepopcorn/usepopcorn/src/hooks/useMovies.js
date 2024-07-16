import { useEffect, useState } from "react";
const OMDBAPIKey = "8b45548c";
export function useMovies(query) {
	const [error, setError] = useState(null);
	const [movies, setMovies] = useState([]);
	const [isSearchingMovies, setIsSearchingMovies] = useState(false);
	useEffect(
		function () {
			const controller = new AbortController();
			async function FetchMovies() {
				try {
					setIsSearchingMovies(true);
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${OMDBAPIKey}&s=${query}`,
						{ signal: controller.signal }
					);
					const data = await res.json();
					if (data.Response === "False") {
						setMovies([]);
						setError("Not find film data");
					} else {
						setError(null);
						setMovies(data.Search);
					}
					setIsSearchingMovies(false);
				} catch (err) {
					if (err.name !== "AbortError") {
						setIsSearchingMovies(false);
						setError(err);
					}
				}
			}
			if (query === "") {
				return;
			}
			FetchMovies();
			return function () {
				controller.abort();
			};
		},
		[query]
	);
	return [movies, error, isSearchingMovies];
}
