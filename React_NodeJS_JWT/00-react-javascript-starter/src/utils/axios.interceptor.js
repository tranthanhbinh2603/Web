import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	function (response) {
		return response?.data ?? response;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default axiosInstance;
