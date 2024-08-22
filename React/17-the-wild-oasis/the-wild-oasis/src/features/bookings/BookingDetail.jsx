import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

import { useMoveBack } from "../../hooks/useMoveBack";
import {
	deleteBooking,
	getBooking,
	updateBooking,
} from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { bookingId } = useParams();
	const moveBack = useMoveBack();
	const navigate = useNavigate();

	const {
		isLoading,
		isError,
		error,
		data: booking,
	} = useQuery({
		queryKey: ["booking", bookingId],
		queryFn: () => getBooking(bookingId),
	});

	const queryClient = useQueryClient();

	const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
		mutationFn: ({ id, statusUpdate }) => updateBooking(id, statusUpdate),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
			navigate("/bookings");
			toast.success("Check out booking successful");
		},
		onError: (err) => {
			console.log(err);
			toast.success("Check out booking failed");
		},
	});

	const { isLoading: isDeleteBooking, mutate: deleteBookingFn } = useMutation({
		mutationFn: ({ id }) => deleteBooking(id),
		// mutationFn: ({ id }) => testDelete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
			navigate("/bookings");
			toast.success("Delete booking successful");
		},
		onError: (err) => {
			console.log(err);
			toast.success("Delete booking failed");
		},
	});

	if (isLoading) return <Spinner />;
	if (isError) {
		throw new Error(error.message);
	}

	const { status } = booking;
	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonGroup>
					<Button variation="secondary" onClick={moveBack}>
						&larr; Back
					</Button>
				</ButtonGroup>
			</Row>

			<BookingDataBox booking={booking} />

			<div
				style={{
					float: "right",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "1.2rem",
				}}
			>
				{status === "unconfirmed" && (
					<Button
						variation="primary"
						onClick={() => navigate(`/check-in/${bookingId}`)}
					>
						Check-in for booking #{bookingId}
					</Button>
				)}
				{status === "checked-in" && (
					<Button
						variation="primary"
						onClick={() =>
							checkOut({
								id: bookingId,
								statusUpdate: { status: "checked-out" },
							})
						}
						disabled={isCheckingOut}
					>
						Check-out for booking #{bookingId}
					</Button>
				)}
				<Modal>
					<Modal.Open>
						<Button variation="danger" disabled={isDeleteBooking}>
							DELETE CABIN
						</Button>
					</Modal.Open>
					<Modal.Window
						resourceName="booking"
						onConform={() => deleteBookingFn({ id: bookingId })}
					>
						<ConfirmDelete />
					</Modal.Window>
				</Modal>
			</div>
		</>
	);
}

export default BookingDetail;
