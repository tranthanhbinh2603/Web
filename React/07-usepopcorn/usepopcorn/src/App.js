import { useEffect, useRef, useState } from "react";
import StarRating from "./component/StarRating";
import { useMovies } from "./hooks/useMovies";
import { useMovieInfo } from "./hooks/useMovieInfo";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useKey } from "./hooks/useKey";

const average = (arr) => {
	const avg = arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
	const roundedAvg = Math.round(avg * 10) / 10;
	if (roundedAvg % 1 === 0) {
		return roundedAvg.toFixed(0);
	} else {
		return roundedAvg.toFixed(1);
	}
};

export default function App() {
	const [query, setQuery] = useState("hacker");
	const [watching, setWatching] = useState(null);
	const [movies, error, isSearchingMovies] = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], "watched");
	function clearWatching() {
		setWatching(null);
	}
	function handleFilmWatched(data) {
		setWatched([...watched, data]);
		setWatching(null);
	}
	function handleFilmDeleteWatched(imdbID) {
		setWatched(watched.filter((item) => item.imdbID !== String(imdbID)));
	}
	function filterYourRatingExist() {
		return watched.filter((i) => i.imdbID === String(watching))[0]?.userRating;
	}
	useEffect(
		function () {
			async function ChangeTitleQuery() {
				if (!query) return;
				document.title = `${query} search`;
				return function () {
					document.title = "usePopcorn";
				};
			}
			ChangeTitleQuery();
		},
		[query]
	);
	return (
		<>
			<NavBar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<ResultSearch movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{error ? (
						<Error error={error} />
					) : isSearchingMovies ? (
						<Searching />
					) : (
						<MainSearchResult movies={movies} setWatching={setWatching} />
					)}
				</Box>
				<Box>
					{watching ? (
						<InfoFilm
							watchingId={watching}
							clearWatching={clearWatching}
							addFilmWatched={handleFilmWatched}
							yourExistRating={filterYourRatingExist()}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedFilms
								watched={watched}
								deleteFilm={handleFilmDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function InfoFilm({
	watchingId,
	clearWatching,
	addFilmWatched,
	yourExistRating,
}) {
	const [userRating, setUserRating] = useState(0);
	const [infoData, isSearchingMovieInfo, error] = useMovieInfo(watchingId);
	const countUserChangeRating = useRef(0);
	useEffect(
		function () {
			if (userRating) countUserChangeRating.current++;
		},
		[userRating]
	);
	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actor,
		Director: director,
		Genre: genre,
	} = infoData;
	function sendData() {
		const newData = {
			imdbID: watchingId,
			Title: title,
			Year: String(released).split(" ")[2],
			Poster: poster,
			runtime: Number(runtime.split(" ")[0]),
			imdbRating: Number(imdbRating),
			userRating: Number(userRating),
			countUserChangeRating: Number(countUserChangeRating.current),
		};
		addFilmWatched(newData);
	}
	return error ? (
		<Error />
	) : isSearchingMovieInfo ? (
		<Searching />
	) : (
		<div className="details">
			<header>
				<button className="btn-back" onClick={clearWatching}>
					&larr;
				</button>
				<img src={poster} alt={`${title} movie`} loading="lazy"></img>
				<div className="details-overview">
					<h2>{title}</h2>
					<p>
						{released} &bull; {runtime}
					</p>
					<p>{genre}</p>
					<p>
						<span>⭐</span>
						{imdbRating} IMDB rating
					</p>
				</div>
			</header>
			<section>
				<div className="rating">
					{yourExistRating === undefined ? (
						<StarRating
							maxStar={10}
							onSetRating={setUserRating}
							defaultRating={userRating}
						/>
					) : (
						<p>Your rating is ⭐{yourExistRating}</p>
					)}

					{userRating !== 0 && yourExistRating === undefined ? (
						<button className="btn-add" onClick={sendData}>
							Add to watched movie
						</button>
					) : (
						<></>
					)}
				</div>
				<p>
					<em>{plot}</em>
				</p>
				<p>Starring {actor}</p>
				<p>Directed by {director}</p>
			</section>
		</div>
	);
}

function Searching() {
	return <h1>Searching....</h1>;
}

function Error({ error }) {
	return <h1>🤚 {error}</h1>;
}

function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function Search({ query, setQuery }) {
	const inputEl = useRef(null);
	useKey("enter", function () {
		if (document.activeElement === inputEl.current) return;
		inputEl.current.focus();
		setQuery("");
	});
	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
}

function ResultSearch({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function NavBar({ children }) {
	return <nav className="nav-bar">{children}</nav>;
}

function Box({ children }) {
	const [isOpen1, setIsOpen1] = useState(true);
	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen1((open) => !open)}
			>
				{isOpen1 ? "–" : "+"}
			</button>
			{isOpen1 && children}
		</div>
	);
}

function WatchedFilms({ watched, deleteFilm }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedFilm movie={movie} deleteFilm={deleteFilm} key={movie.imdbID} />
			))}
		</ul>
	);
}

function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

function MainSearchResult({ movies, setWatching }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<ResultFilm
					movie={movie}
					setWatching={setWatching}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

function ResultFilm({ movie, setWatching }) {
	return (
		<li key={movie.imdbID} onClick={() => setWatching(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function WatchedFilm({ movie, deleteFilm }) {
	return (
		<li key={movie.imdbID}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
				<button className="btn-delete" onClick={() => deleteFilm(movie.imdbID)}>
					&#10005;
				</button>
			</div>
		</li>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}
