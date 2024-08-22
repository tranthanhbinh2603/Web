import { useParams } from "react-router-dom";
import CheckinBooking from "../features/check-in-out/CheckinBooking";
import { getBooking } from "../services/apiBookings";
import Spinner from "../ui/Spinner";
import { useQuery } from "@tanstack/react-query";

function CheckIn() {
	const { checkInId } = useParams();

	const {
		isLoading,
		isError,
		error,
		data: booking,
	} = useQuery({
		queryKey: ["booking", checkInId],
		queryFn: () => getBooking(checkInId),
	});
	if (isLoading) return <Spinner />;
	if (isError) {
		throw new Error(error.message);
	}
	return <CheckinBooking booking={booking} />;
}

export default CheckIn;
