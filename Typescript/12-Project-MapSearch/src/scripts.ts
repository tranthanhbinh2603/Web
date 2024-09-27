import axios from "axios";
import mapboxgl from "mapbox-gl";

const formElement = document.querySelector("form")! as HTMLFormElement;
const apiKey = process.env.API_KEY;

let map: mapboxgl.Map | null = null;

function handleSummit(event: SubmitEvent) {
	event.preventDefault();
	const inputElement = document.querySelector(".input")! as HTMLFormElement;
	axios
		.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
				inputElement.value
			)}.json?limit=1&proximity=ip&types=region&access_token=${apiKey}`
		)
		.then((response) => {
			const data = response.data;
			if (data.features && data.features.length > 0) {
				mapboxgl.accessToken = apiKey!;

				if (map) {
					map.remove(); // Xóa map cũ
				}

				map = new mapboxgl.Map({
					container: "map",
					style: "mapbox://styles/mapbox/streets-v11",
					center: data.features[0].center, // Đảm bảo đúng kiểu [number, number]
					zoom: 12,
				});

				new mapboxgl.Marker().setLngLat(data.features[0].center).addTo(map);

				const mapContainer = document.getElementById("map");
				if (mapContainer) {
					const paragraph = mapContainer.querySelector("p");
					if (paragraph) {
						paragraph.style.display = "none";
					}
				}
			} else {
				if (map) {
					map.remove();
					map = null;
				}

				const mapContainer = document.getElementById("map");
				if (mapContainer) {
					mapContainer.innerHTML =
						"<p>No location like your string search. Please search again.</p>";
				}
			}
		})
		.catch((error) => {
			alert("I have some error when fetch data.");
			console.error(error);
		});
}

formElement.addEventListener("submit", handleSummit);
