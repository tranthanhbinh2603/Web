// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { ConvertToEmoji } from "../utils/ConvertToEmoji";
import { useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CitiesContext } from "../context/CitiesContext";

function Form() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");
	const [loadingCityAPI, setLoadingCityAPI] = useState(false);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const lat = parseFloat(searchParams.get("lat"));
	const lng = parseFloat(searchParams.get("lng"));
	const { addCity, isAddingCity } = useContext(CitiesContext);
	useEffect(() => {
		if (!lat && !lng) return;
		const controller = new AbortController();
		async function fetchAPI() {
			setLoadingCityAPI(true);
			const res = await fetch(
				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
				{ signal: controller.signal }
			);
			const resultFinal = await res.json();
			console.log(resultFinal);
			if (resultFinal.countryName) {
				setCityName(resultFinal.countryName);
				setEmoji(ConvertToEmoji(resultFinal.countryCode));
				setCountry(resultFinal.city);
			} else setCityName(null);
			setLoadingCityAPI(false);
		}
		fetchAPI();
		return () => {
			controller.abort();
		};
	}, [lat, lng]);
	function summitCity(e) {
		e.preventDefault();
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: {
				lat,
				lng,
			},
		};
		addCity(newCity);
		navigate("/app/cities");
	}
	if (!lat && !lng) return <Message message="Start by clicking in map" />;
	if (loadingCityAPI) return <Spinner />;
	if (!cityName) return <Message message="It seems not country 🤣" />;
	return (
		<form
			className={`${styles.form} ${isAddingCity ? styles.loading : ""}`}
			onSubmit={summitCity}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					id="date"
					selected={date}
					onChange={(date) => setDate(date)}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
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
		</form>
	);
}
export default Form;
