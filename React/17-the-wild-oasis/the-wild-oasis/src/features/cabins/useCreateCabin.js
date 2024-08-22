import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins"; // Adjust the import path to your actual addCabin function
import toast from "react-hot-toast";

const useCreateCabin = (cabinToEdit) => {
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: cabinToEdit,
	});

	const queryClient = useQueryClient();

	const { isLoading: isAdding, mutate: handleAddCabin } = useMutation({
		mutationFn: addCabin,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			reset();
			toast.success("Create successful");
		},
		onError: (err) => {
			toast.error(`Create failed, Error is: ${err}`);
		},
	});

	return {
		register,
		handleSubmit,
		reset,
		getValues,
		formState,
		isAdding,
		handleAddCabin,
	};
};

export default useCreateCabin;
