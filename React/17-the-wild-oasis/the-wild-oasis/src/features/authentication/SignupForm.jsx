import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { signIn as signInAPI } from "../../services/apiLogin";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { register, formState, handleSubmit, watch } = useForm();
	const { errors } = formState;

	const { isLoading: isSignin, mutate: signin } = useMutation({
		mutationFn: signInAPI,
		onSuccess: () => {
			toast.success("Sign in successful");
		},
		onError: () => {
			toast.error("Sign in failed");
		},
	});

	function handleFormSubmit(data) {
		signin(data);
	}

	return (
		<Form onSubmit={handleSubmit(handleFormSubmit)}>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input
					type="text"
					id="fullName"
					disabled={isSignin}
					{...register("fullName", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					disabled={isSignin}
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Invalid email address",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					disabled={isSignin}
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters long",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isSignin}
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							value === watch("password") || "Passwords do not match",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset" disabled={isSignin}>
					Cancel
				</Button>
				<Button disabled={isSignin}>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
