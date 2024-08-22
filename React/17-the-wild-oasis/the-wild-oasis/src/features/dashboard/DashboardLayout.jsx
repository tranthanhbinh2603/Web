import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import {
	getBookingsAfterDate,
	getStaysAfterDate,
} from "../../services/apiBookings";
import Empty from "../../ui/Empty";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Stats from "./Stats";
import useLoadCabin from "../cabins/useLoadCabin";
import SalesChart from "./SalesChart";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const [searchParams] = useSearchParams();
	const numDays = !searchParams.get("filter")
		? 7
		: Number(searchParams.get("filter"));
	const queryDate = useMemo(
		() => subDays(new Date(), numDays).toISOString(),
		[numDays]
	);
	const {
		isLoading: isGetBookings,
		isError: getBookingsError,
		data: bookings,
	} = useQuery({
		queryKey: ["stays", `${queryDate}`],
		queryFn: () => getBookingsAfterDate(queryDate),
	});
	const {
		isLoading: isGetStays,
		isError: getStaysError,
		data: stays,
	} = useQuery({
		queryKey: ["booking", `${queryDate}`],
		queryFn: () => getStaysAfterDate(queryDate),
	});
	const { cabins } = useLoadCabin();
	const confirmedStays = stays?.filter(
		(stay) => stay.status === "checked-in" || stay.status === "checked-out"
	);
	if (isGetBookings || isGetStays) return <Spinner />;
	if (getBookingsError || getStaysError) return <Empty resource="results" />;
	return (
		<>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins?.length}
			/>
			<StyledDashboardLayout>
				<TodayActivity />
				<DurationChart stays={stays} />
				<SalesChart bookings={bookings} numDays={numDays} />
			</StyledDashboardLayout>
		</>
	);
}

export default DashboardLayout;
