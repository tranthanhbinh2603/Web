/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function CreateCabinForm({ handleButtonClick = () => {}, cabinToEdit = {} }) {
	const oldFileName = cabinToEdit.image;
	const isEditCabin = (cabinToEdit?.id ?? 0) !== 0;
	const {
		register,
		handleSubmit,
		getValues,
		formState,
		isAdding,
		handleAddCabin,
	} = useCreateCabin(cabinToEdit);
	const { errors } = formState;
	const { isEditing, handleEditCabin } = useEditCabin();
	function onSubmit(data) {
		const processedImage =
			typeof data.image === "string" ? data.image : data.image[0];

		if (!isEditCabin) {
			handleAddCabin({ ...data, image: processedImage });
		} else {
			handleEditCabin({
				...data,
				image: processedImage,
				oldFileName: oldFileName,
			});
		}
		handleButtonClick?.();
	}
	const isWorking = isEditing || isAdding;
	return (
		<Form onSubmit={handleSubmit(onSubmit)} type="modal">
			<FormRow>
				<Label htmlFor="name">Cabin name</Label>
				<Input
					type="text"
					id="name"
					{...register("name", {
						required: "This field is required",
					})}
					disabled={isWorking}
				/>
				{errors?.name?.message && <Error>{errors?.name?.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor="maxCapacity">Maximum capacity</Label>
				<Input
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Maximum capacity must be at least 1",
						},
					})}
					disabled={isWorking}
				/>
				{errors?.maxCapacity?.message && (
					<Error>{errors?.maxCapacity?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="regularPrice">Regular price</Label>
				<Input
					type="number"
					id="regularPrice"
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 0,
							message: "Price need greater than 0",
						},
					})}
					disabled={isWorking}
				/>
				{errors?.regularPrice?.message && (
					<Error>{errors?.regularPrice?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					{...register("discount", {
						required: "This field is required",
						min: {
							value: 0,
							message: "Discount need greater than 0",
						},
						validate: (value) => {
							if (Number(value) > Number(getValues().regularPrice))
								return "The discount must be below the price";
						},
					})}
					disabled={isWorking}
				/>
				{errors?.discount?.message && (
					<Error>{errors?.discount?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description for cabin</Label>
				<Textarea
					type="text"
					id="description"
					{...register("description")}
					defaultValue=""
					disabled={isWorking}
				/>
				{errors?.description?.message && (
					<Error>{errors?.description?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput
					id="image"
					accept="image/*"
					disabled={isWorking}
					{...register("image", {
						validate: (value) => {
							if (!isEditCabin && value.length === 0) {
								return "This field is required when condition is met";
							}
							return true;
						},
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				{!isEditCabin && (
					<Button
						variation="secondary"
						type="reset"
						disabled={isAdding}
						onClick={handleButtonClick}
					>
						Cancel
					</Button>
				)}
				<Button variation="primary" type="submit" disabled={isAdding}>
					{!isEditCabin ? "Add cabin" : "Edit cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
