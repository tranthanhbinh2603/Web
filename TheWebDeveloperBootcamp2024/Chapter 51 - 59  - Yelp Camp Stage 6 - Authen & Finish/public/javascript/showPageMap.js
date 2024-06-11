mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/light-v10", // stylesheet location
	center: [100, 200], // starting position [lng, lat]
	zoom: 10, // starting zoom
});
