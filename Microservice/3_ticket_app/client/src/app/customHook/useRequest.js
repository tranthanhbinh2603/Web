import { useState } from "react";
import axios from "@/utils/axios.interceptor";

const useRequest = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const sendRequest = async (url, method = "GET", payload = {}) => {
		setIsLoading(true);
		try {
			const response = await axios({
				url,
				method,
				data: payload,
				validateStatus: () => true,
			});
			setData(response);
			return response.data;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		data,
		isLoading,
		sendRequest,
	};
};

export default useRequest;
