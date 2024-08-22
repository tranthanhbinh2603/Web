/* eslint-disable react/prop-types */
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendar,
	HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const StatsLayout = styled.div`
	display: flex;
	gap: 1.2rem;
	margin-bottom: 2rem;

	> div {
		flex: 1;
	}
`;

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	const numBookings = bookings.length ?? 0;
	const sales = bookings.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.totalPrice;
	}, 0);
	const checkIns = confirmedStays.length ?? 0;
	const occupation =
		confirmedStays.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.numNights;
		}, 0) /
		(numDays * Number(cabinCount));
	return (
		<StatsLayout>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				icon={<HiOutlineCalendar />}
				value={checkIns}
			/>
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={`${(occupation * 100).toFixed(2).replace(/\.?0+$/, "")} %`}
			/>
		</StatsLayout>
	);
}

export default Stats;
