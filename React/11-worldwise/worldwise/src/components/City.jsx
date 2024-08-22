import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useFetchAPI } from "../hooks/useFetchAPI";
import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";
import styles from "./City.module.css";
import Button from "./Button";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

/* eslint-disable react/prop-types */
function City() {
	const navigate = useNavigate();
	const { ROOT_API } = useContext(CitiesContext);
	const { id } = useParams();
	const [data, isLoading, error] = useFetchAPI(`${ROOT_API}/cities/${id}`);
	if (isLoading) return <Spinner />;
	if (error) throw new Error(error);
	const { cityName, notes, date, emoji } = data;
	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji}</span> {cityName}
				</h3>
			</div>
			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>
			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}
			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>
			<Button
				type="back"
				onclick={(e) => {
					e.preventDefault();
					navigate(-1);
				}}
			>
				&larr; Back
			</Button>
		</div>
	);
}

export default City;
