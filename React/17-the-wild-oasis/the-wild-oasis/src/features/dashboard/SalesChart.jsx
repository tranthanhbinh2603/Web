/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import styled from "styled-components";
import { DarkModeContext } from "../../context/DarkModeContext";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useContext } from "react";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

// const fakeData = [
// 	{ label: "Jan 09", totalSales: 480, extrasSales: 20 },
// 	{ label: "Jan 10", totalSales: 580, extrasSales: 100 },
// 	{ label: "Jan 11", totalSales: 550, extrasSales: 150 },
// 	{ label: "Jan 12", totalSales: 600, extrasSales: 50 },
// 	{ label: "Jan 13", totalSales: 700, extrasSales: 150 },
// 	{ label: "Jan 14", totalSales: 800, extrasSales: 150 },
// 	{ label: "Jan 15", totalSales: 700, extrasSales: 200 },
// 	{ label: "Jan 16", totalSales: 650, extrasSales: 200 },
// 	{ label: "Jan 17", totalSales: 600, extrasSales: 300 },
// 	{ label: "Jan 18", totalSales: 550, extrasSales: 100 },
// 	{ label: "Jan 19", totalSales: 700, extrasSales: 100 },
// 	{ label: "Jan 20", totalSales: 800, extrasSales: 200 },
// 	{ label: "Jan 21", totalSales: 700, extrasSales: 100 },
// 	{ label: "Jan 22", totalSales: 810, extrasSales: 50 },
// 	{ label: "Jan 23", totalSales: 950, extrasSales: 250 },
// 	{ label: "Jan 24", totalSales: 970, extrasSales: 100 },
// 	{ label: "Jan 25", totalSales: 900, extrasSales: 200 },
// 	{ label: "Jan 26", totalSales: 950, extrasSales: 300 },
// 	{ label: "Jan 27", totalSales: 850, extrasSales: 200 },
// 	{ label: "Jan 28", totalSales: 900, extrasSales: 100 },
// 	{ label: "Jan 29", totalSales: 800, extrasSales: 300 },
// 	{ label: "Jan 30", totalSales: 950, extrasSales: 200 },
// 	{ label: "Jan 31", totalSales: 1100, extrasSales: 300 },
// 	{ label: "Feb 01", totalSales: 1200, extrasSales: 400 },
// 	{ label: "Feb 02", totalSales: 1250, extrasSales: 300 },
// 	{ label: "Feb 03", totalSales: 1400, extrasSales: 450 },
// 	{ label: "Feb 04", totalSales: 1500, extrasSales: 500 },
// 	{ label: "Feb 05", totalSales: 1400, extrasSales: 600 },
// 	{ label: "Feb 06", totalSales: 1450, extrasSales: 400 },
// ];

function SalesChart({ bookings, numDays }) {
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});
	const data = allDates.map((date) => {
		return {
			label: format(date, "MMM dd"),
			totalSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.extrasPrice, 0),
		};
	});
	const { isDarkMode } = useContext(DarkModeContext);

	const colors = isDarkMode
		? {
				totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
				extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#374151",
				background: "#18212f",
		  }
		: {
				totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
				extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
		  };

	return (
		<StyledSalesChart>
			<Heading as="h2">Sales</Heading>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					width={500}
					height={400}
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="label" tick={{ fill: colors.text }} />
					<YAxis tick={{ fill: colors.text }} />
					<Tooltip labelStyle={{ color: colors.text }} />
					<Area
						type="monotone"
						dataKey="totalSales"
						stackId="1"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
					/>
					<Area
						type="monotone"
						dataKey="extrasSales"
						stackId="2"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

export default SalesChart;
