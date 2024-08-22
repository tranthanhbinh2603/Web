import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";

/* eslint-disable react/prop-types */
function CityList() {
	const { data, isLoading, error } = useContext(CitiesContext);
	if (isLoading) <Spinner />;
	if (error) return <Message message="Check your internet" />;
	if (!data.length)
		return <Message message="Add the first city by clicking a city in map" />;
	return (
		<ul className={styles.cityList}>
			{data.map((item) => {
				return <CityItem city={item} key={item.id} />;
			})}
		</ul>
	);
}

export default CityList;
