import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";

/* eslint-disable react/prop-types */
function CountryList() {
	const { data, isLoading, error } = useContext(CitiesContext);
	if (isLoading) <Spinner />;
	if (error) return <Message message="Check your internet" />;
	if (!data.length)
		return <Message message="Add the first city by clicking a city in map" />;
	const countryList = data.reduce((arr, item) => {
		if (!arr.map((el) => el.country).includes(item.country))
			return [...arr, { country: item.country, emoji: item.emoji }];
		else return arr;
	}, []);
	return (
		<ul className={styles.countryList}>
			{countryList.map((item) => {
				return <CountryItem country={item} key={item.country} />;
			})}
		</ul>
	);
}

export default CountryList;
