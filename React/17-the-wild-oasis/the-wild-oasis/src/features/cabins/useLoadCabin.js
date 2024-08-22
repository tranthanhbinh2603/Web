import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useLoadCabin() {
	const {
		isLoading,
		isError,
		data: cabins,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});
	return { isLoading, isError, cabins };
}

export default useLoadCabin;
