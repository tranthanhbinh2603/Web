import { useState } from "react";
import axios from "@/utils/axios.interceptor";

const useRequest = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const sendRequest = async (url, method = "GET", payload = {}, onSuccess) => {
		setIsLoading(true);
		try {
			const response = await axios({
				url,
				method,
				data: payload,
				validateStatus: () => true,
			});
			setData(response);
			if (onSuccess && response?.msg === "successful") {
				onSuccess(response);
			}
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
