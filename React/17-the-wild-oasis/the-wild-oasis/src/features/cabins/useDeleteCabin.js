import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useEditCabin = () => {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Delete successful");
		},
		onError: (err) => {
			toast.error(`Delete failed, Error is: ${err}`);
		},
	});

	return {
		isDeleting,
		mutate,
	};
};

export default useEditCabin;
