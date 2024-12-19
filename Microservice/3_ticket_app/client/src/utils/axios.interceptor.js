import axios from "axios";
// import { notification } from "antd";

let navigate;

// export const setNavigate = (nav) => {
// 	navigate = nav;
// };

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
	function (config) {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("access_token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
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
		// if (error.response?.status === 401 && navigate) {
		// 	navigate("/login");
		// 	notification.error({
		// 		message: "You need to login to access this page.",
		// 		description: "Please login again.",
		// 	});
		// }
		return Promise.reject(error);
	}
);

export default axiosInstance;
