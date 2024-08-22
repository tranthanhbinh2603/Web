import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeInfoUser as changeInfoUserAPI } from "../../services/apiLogin";
import toast from "react-hot-toast";

function UpdateUserDataForm() {
	const { handleSubmit, register } = useForm();

	// We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
	const {
		user: {
			user: {
				email,
				user_metadata: { fullName: currentFullName, avatar: avatarFileName },
			},
		},
	} = useUser();

	const [fullName, setFullName] = useState(currentFullName || ""); // Default to empty string if undefined
	const [setAvatar] = useState(null);

	const queryClient = useQueryClient();
	const { isLoading: isChangeInfo, mutate: changeInfoUser } = useMutation({
		mutationFn: changeInfoUserAPI,
		onSuccess: (user) => {
			toast.success("Change info user successful");
			queryClient.setQueryData(["user"], user);
		},
		onError: (err) => {
			toast.error(`Change info have error. Error is: ${err}`);
		},
	});

	function onSubmit(data) {
		changeInfoUser({ ...data, avatarFileName });
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>
			<FormRow label="Full name">
				<Input
					type="text"
					defaultValue={fullName}
					onChange={(e) => setFullName(e.target.value)}
					id="fullName"
					disabled={isChangeInfo}
					{...register("fullName")}
				/>
			</FormRow>
			<FormRow label="Avatar image">
				<FileInput
					id="avatar"
					accept="image/*"
					onChange={(e) => setAvatar(e.target.files[0])}
					disabled={isChangeInfo}
					{...register("avatar")}
				/>
			</FormRow>
			<FormRow>
				<Button type="reset" variation="secondary" disabled={isChangeInfo}>
					Cancel
				</Button>
				<Button disabled={isChangeInfo}>Update account</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;
