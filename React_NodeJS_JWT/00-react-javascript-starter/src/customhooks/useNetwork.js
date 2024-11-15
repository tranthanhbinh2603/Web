//How to use:
//let [isOnline, connection] = useNetwork();
//isOnline: true - false bieu thi viec co mang hay khong
//connection co the truy cap: connection.downlink, connection.effectiveType, connection.rtt

import { useState, useEffect } from "react";

const getConnection = () => {
	return (
		navigator.connection ||
		navigator.mozConnection ||
		navigator.webkitConnection ||
		null
	);
};

export const useNetwork = () => {
	const [connection, setConnection] = useState(getConnection());
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const updateStatus = () => {
			setConnection(getConnection());
			setIsOnline(navigator.onLine);
		};

		const connection = getConnection();

		if (connection) {
			connection.addEventListener("change", updateStatus);
		}
		window.addEventListener("online", updateStatus);
		window.addEventListener("offline", updateStatus);

		return () => {
			if (connection) {
				connection.removeEventListener("change", updateStatus);
			}
			window.removeEventListener("online", updateStatus);
			window.removeEventListener("offline", updateStatus);
		};
	}, []);

	return [isOnline, connection];
};
