import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

/* eslint-disable react/prop-types */
function CityItem({ city }) {
	const { currentCity, setCurrentCity } = useContext(CitiesContext);
	const { cityName, emoji, date, id, position } = city;
	const { deleteCity } = useContext(CitiesContext);
	function handleDeleteCity(e) {
		e.preventDefault();
		deleteCity(id);
	}
	return (
		<Link
			className={`${styles.cityItem} ${
				currentCity === id ? styles["cityItem--active"] : ""
			}`}
			to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			onClick={() => setCurrentCity(id)}
		>
			<span className={styles.emoji}>{emoji}</span>
			<h3 className={styles.city}>{cityName}</h3>
			<time className={styles.date}>{formatDate(date)}</time>
			<button className={styles.deleteBtn} onClick={handleDeleteCity}>
				&times;
			</button>
		</Link>
	);
}

export default CityItem;
