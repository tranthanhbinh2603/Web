import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { getBookings } from "../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../data/constant";

function BookingTable() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	const pageCurrent = parseInt(searchParams.get("pages")) || 1;

	const filterValue = searchParams.get("filter") ?? "all";
	const sortValue = searchParams.get("sort") ?? "startDate-desc";
	const filter =
		filterValue !== "all"
			? { status: { comparison: "eq", value: filterValue } }
			: {};
	const sort = {
		column: sortValue.split("-")[0],
		ascending: sortValue.split("-")[1] === "asc",
	};

	const {
		data: { data: bookings, count } = {},
		error,
		isLoading,
	} = useQuery({
		queryKey: ["bookings", filter, sort, pageCurrent],
		queryFn: getBookings,
	});

	const maxPage = Math.ceil(count / PAGE_SIZE);
	if (maxPage > pageCurrent)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sort, pageCurrent + 1],
			queryFn: getBookings,
		});
	if (1 < pageCurrent)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sort, pageCurrent - 1],
			queryFn: getBookings,
		});

	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<Menus>
			<Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={bookings}
					render={(booking) => (
						<BookingRow key={booking.id} booking={booking} />
					)}
				/>
			</Table>
			<Pagination length={count} />
		</Menus>
	);
}

export default BookingTable;
