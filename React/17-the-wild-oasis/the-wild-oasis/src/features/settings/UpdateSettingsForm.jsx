import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {
	getSettings,
	updateSetting as updateSettingApi,
} from "../../services/apiSettings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

function UpdateSettingsForm() {
	const { isLoading, data: settings } = useQuery({
		queryKey: ["settings"],
		queryFn: getSettings,
	});
	const queryClient = useQueryClient();

	const { isLoading: isEditingSetting, mutate: updateSetting } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["settings"],
			});
			toast.success("Edit setting successful");
		},
		onError: (err) => {
			toast.error(`Edit setting failed, Error is: ${err}`);
		},
	});
	const {
		minBookingLength,
		maxBookingLength,
		maxGuestPerBooking,
		breakFastPrice,
	} = settings || {};
	function handleEditSetting(e, key) {
		console.log(e);
		updateSetting([{ [key]: e }]);
	}
	if (isLoading) return <Spinner />;
	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isEditingSetting}
					onBlur={(e) => handleEditSetting(e.target.value, "minBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={isEditingSetting}
					onBlur={(e) => handleEditSetting(e.target.value, "maxBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestPerBooking}
					disabled={isEditingSetting}
					onBlur={(e) =>
						handleEditSetting(e.target.value, "maxGuestPerBooking")
					}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakFastPrice}
					disabled={isEditingSetting}
					onBlur={(e) => handleEditSetting(e.target.value, "breakFastPrice")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
