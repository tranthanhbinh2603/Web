import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins"; // Adjust the import path to your actual editCabin function
import toast from "react-hot-toast";

const useEditCabin = () => {
	const queryClient = useQueryClient();

	const { isLoading: isEditing, mutate: handleEditCabin } = useMutation({
		mutationFn: editCabin,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Edit successful");
		},
		onError: (err) => {
			toast.error(`Edit failed, Error is: ${err}`);
		},
	});

	return {
		isEditing,
		handleEditCabin,
	};
};

export default useEditCabin;
