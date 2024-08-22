// import { createContext, useContext } from "react";

// const CitiesContext = createContext();

// /* eslint-disable react/prop-types */
// function CitiesProvider({ children }) {
//  //All use, all code below return here
// 	return (
// 		<CitiesContext.Provider
// 			value={
// 				{
// 					//Value here
// 					//Ex: add={handleAdd} => add: handleAdd
// 					//Ex: delete={delete} => delete
// 				}
// 			}
// 		>
// 			{children}
// 		</CitiesContext.Provider>
// 	);
// }

// export { CitiesContext, CitiesProvider };

// How to import in parents:
// <CitiesProvider></CitiesProvider>

// How to use:
// const {/*id you want*/} = useContext(CitiesContext)
// Ex: const { add, delete } = useContext(CitiesContext)

import { createContext, useState } from "react";
import { useFetchAPI } from "../hooks/useFetchAPI";

const ROOT_API = "http://localhost:8000";
const CitiesContext = createContext();

/* eslint-disable react/prop-types */
function CitiesProvider({ children }) {
	const [currentCity, setCurrentCity] = useState(null);
	const [data, isLoading, error, loadAgain] = useFetchAPI(`${ROOT_API}/cities`);
	const [isAddingCity, setIsAddingCity] = useState(false);
	const [isDeleteCity, setIsDeleteCity] = useState(false);
	async function addCity(dataCity) {
		setIsAddingCity(true);
		const res = await fetch(`${ROOT_API}/cities`, {
			method: "POST",
			body: JSON.stringify(dataCity),
			header: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		setCurrentCity(data);
		loadAgain();
		setIsAddingCity(false);
	}
	async function deleteCity(id) {
		setIsDeleteCity(true);
		await fetch(`${ROOT_API}/cities/${id}`, {
			method: "DELETE",
		});
		loadAgain();
		setIsDeleteCity(false);
	}
	return (
		<CitiesContext.Provider
			value={{
				ROOT_API,
				data,
				isLoading,
				error,
				currentCity,
				setCurrentCity,
				addCity,
				isAddingCity,
				deleteCity,
				isDeleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

// How to use:
// const {/*id you want*/} = useContext(CitiesContext)
// Ex: const { add, delete } = useContext(CitiesContext)

export { CitiesContext, CitiesProvider };
