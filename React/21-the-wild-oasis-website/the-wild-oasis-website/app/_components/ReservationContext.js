"use client";

import { createContext, useState } from "react";

const ReservationContext = createContext();

/* eslint-disable react/prop-types */
function ReservationProvider({ children }) {
	const [range, setRange] = useState({ from: null, to: null });
	const handleRange = (newRange) => {
		setRange(newRange);
	};
	const clearRange = () => {
		setRange({ from: null, to: null });
	};

	return (
		<ReservationContext.Provider
			value={{
				range,
				handleRange,
				clearRange,
			}}
		>
			{children}
		</ReservationContext.Provider>
	);
}

export { ReservationContext, ReservationProvider };

// How to import in parents:
// <ReservationProvider></ReservationProvider>

// How to use:
// const {/*id you want*/} = useContext(ReservationContext)
// Ex: const { add, delete } = useContext(ReservationContext)
