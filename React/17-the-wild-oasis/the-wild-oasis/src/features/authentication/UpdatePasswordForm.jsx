import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserPassword, logout } from "../../services/apiLogin";
import toast from "react-hot-toast";

function UpdatePasswordForm() {
	const { register, handleSubmit, formState, getValues, reset } = useForm();
	const { errors } = formState;

	function onSubmit(data) {
		changePassword(data);
	}

	const queryClient = useQueryClient();
	const { isLoading: isChangePassword, mutate: changePassword } = useMutation({
		mutationFn: changeUserPassword,
		onSuccess: async (user) => {
			toast.success("Change password user successful");
			queryClient.setQueryData(["user"], user);
			try {
				await logout();
				window.location.reload();
			} catch (err) {
				toast.error(`Error during logout: ${err.message}`);
			}
		},
		onError: (err) => {
			toast.error(`Change password have error. Error is: ${err}`);
		},
	});

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					disabled={isChangePassword}
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password needs a minimum of 8 characters",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Confirm password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type="password"
					autoComplete="new-password"
					id="passwordConfirm"
					disabled={isChangePassword}
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							getValues().password === value || "Passwords need to match",
					})}
				/>
			</FormRow>
			<FormRow>
				<Button onClick={reset} type="reset" variation="secondary">
					Cancel
				</Button>
				<Button disabled={isChangePassword}>Update password</Button>
			</FormRow>
		</Form>
	);
}

export default UpdatePasswordForm;
