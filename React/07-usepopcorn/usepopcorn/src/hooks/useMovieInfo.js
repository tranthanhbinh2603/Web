import { useEffect, useState } from "react";
const OMDBAPIKey = "8b45548c";
export function useMovieInfo(watchingId) {
	const [isSearchingMovieInfo, setIsSearchingMovieInfo] = useState(false);
	const [infoData, setInfoData] = useState({});
	const [error, setError] = useState(null);
	useEffect(
		function () {
			const controller = new AbortController();
			async function FetchMovieInfo() {
				try {
					setIsSearchingMovieInfo(true);
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${OMDBAPIKey}&i=${watchingId}`,
						{ signal: controller.signal }
					);
					const data = await res.json();
					if (data.Response === false) {
						setInfoData([]);
						setError("Not find film data");
					} else {
						setInfoData(data);
					}
					setIsSearchingMovieInfo(false);
				} catch (err) {
					if (err.name !== "AbortError") {
						setIsSearchingMovieInfo(false);
						setError(err);
					}
				}
			}
			FetchMovieInfo();
			return function () {
				controller.abort();
			};
		},
		[watchingId]
	);
	return [infoData, isSearchingMovieInfo, error];
}
