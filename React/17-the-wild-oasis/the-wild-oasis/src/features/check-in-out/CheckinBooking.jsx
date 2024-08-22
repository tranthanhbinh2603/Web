/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useState } from "react";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
	margin-bottom: 1.6rem;
`;

function CheckinBooking({ booking }) {
	const {
		isLoading,
		isError,
		data: settings,
	} = useQuery({
		queryKey: ["settings"],
		queryFn: getSettings,
	});
	const [checkedIn, setcheckedIn] = useState(false);
	const [CheckHasBreakfast, setCheckHasBreakfast] = useState(false);
	const navigate = useNavigate();
	const moveBack = useMoveBack();
	const queryClient = useQueryClient();

	const { isLoading: isCheckin_ing, mutate } = useMutation({
		mutationFn: ({ id, statusUpdate }) => updateBooking(id, statusUpdate),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
			navigate("/bookings");
			toast.success("Check in booking successful");
		},
		onError: (err) => {
			console.log(err);
			toast.success("Check in booking failed");
		},
	});

	if (isLoading || isError) return;

	const { id: bookingId, numNights, numGuests, cabinPrice, guests } = booking;

	function handleCheckin(event) {
		setcheckedIn(event.target.checked);
	}

	function handleCheckHasBreakfast(event) {
		setCheckHasBreakfast(event.target.checked);
		setcheckedIn(false);
	}

	const breakFastPrice = settings.breakFastPrice * numNights * numGuests;

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				<Checkbox onChange={handleCheckHasBreakfast}>
					Want to add breakfast for ${breakFastPrice}?
				</Checkbox>
				<Checkbox onChange={handleCheckin} checked={checkedIn}>
					{CheckHasBreakfast
						? `I have confirmed that Mr./Ms. ${guests.fullName} has paid $${
								breakFastPrice + cabinPrice
						  }. ($${cabinPrice} price + $${breakFastPrice} breakfast).`
						: `I have confirmed that Mr./Ms. ${guests.fullName} has paid $${cabinPrice}.`}
				</Checkbox>
			</Box>
			<ButtonGroup>
				<Button
					onClick={() =>
						mutate({
							id: bookingId,
							statusUpdate: {
								status: "checked-in",
								hasBreakfast: CheckHasBreakfast,
								isPaid: true,
								totalPrice: CheckHasBreakfast
									? cabinPrice + breakFastPrice
									: cabinPrice,
								extrasPrice: CheckHasBreakfast ? breakFastPrice : cabinPrice,
							},
						})
					}
					disabled={isCheckin_ing || !checkedIn}
				>
					Conform check-in
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Cancel
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
