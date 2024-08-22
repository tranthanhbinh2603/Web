import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDuplicateCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isDuplicating, mutate: handleDuplicateCabin } =
		useMutation({
			mutationFn: duplicateCabin,
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ["cabins"],
				});
				toast.success("Duplicate successful");
			},
			onError: (err) => {
				toast.error(`Duplicate failed, Error is: ${err}`);
			},
		});
	return { isDuplicating, handleDuplicateCabin };
}

export default useDuplicateCabin;
