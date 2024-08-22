import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

/* eslint-disable react/prop-types */
function Map() {
	const { data } = useContext(CitiesContext);
	const [position, setPosition] = useState([40, 0]);
	const [navigateCount, setNavigateCount] = useState(0);
	const [searchParams] = useSearchParams();
	const lat = parseFloat(searchParams.get("lat"));
	const long = parseFloat(searchParams.get("lng"));
	const navigate = useNavigate();
	const {
		isLoading,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();

	useEffect(
		function () {
			if (isValidPosition([lat, long])) setPosition([lat, long]);
		},
		[lat, long]
	);

	useEffect(
		function () {
			if (geolocationPosition && navigateCount === 0) {
				setPosition([geolocationPosition.lat, geolocationPosition.lng]);
				navigate(
					`form?lat=${geolocationPosition.lat}&lng=${geolocationPosition.lng}`
				);
				setNavigateCount(navigateCount + 1);
			}
		},
		[geolocationPosition, navigateCount, navigate]
	);

	const isValidPosition = (position) => {
		const [lat, lng] = position;
		return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
	};

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button
					type="position"
					onclick={() => {
						getPosition();
					}}
				>
					{isLoading ? "Loading...." : "Get your location"}
				</Button>
			)}
			<MapContainer
				center={isValidPosition(position) ? position : [0, 0]}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{data.map((item) => {
					const itemPosition = [item.position.lat, item.position.lng];
					return (
						<Marker
							position={isValidPosition(itemPosition) ? itemPosition : [0, 0]}
							key={item.id}
						>
							<Popup>
								{item.emoji} {item.country}
							</Popup>
						</Marker>
					);
				})}
				<SetCenter position={position} />
				<HandleClick />
			</MapContainer>
		</div>
	);
}

function SetCenter({ position }) {
	const map = useMap();
	useEffect(() => {
		if (isValidPosition(position)) {
			map.setView(position);
		}
	}, [map, position]);
	return null;
}

function HandleClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

const isValidPosition = (position) => {
	const [lat, lng] = position;
	return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

export default Map;
