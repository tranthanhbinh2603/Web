"use client";

import { isWithinInterval } from "date-fns";
import { useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ReservationContext } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
	return (
		range.from &&
		range.to &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from, end: range.to })
		)
	);
}

function DateSelector({ settings, cabin, bookedDates }) {
	const regularPrice = cabin.regularPrice;
	const discount = cabin.discount;
	let numNights = 0;
	let cabinPrice = 0;
	const minBookingLength = settings.minBookingLength;
	const maxBookingLength = settings.maxBookingLength;

	const { range, handleRange, clearRange } = useContext(ReservationContext);

	if (range?.from && range?.to) {
		numNights = (range?.to - range?.from) / (1000 * 60 * 60 * 24);
		cabinPrice = (cabin.regularPrice - cabin.discount) * numNights;
	}

	const bookedDatesFinal = bookedDates.map((dateString) =>
		new Date(dateString).toDateString()
	);

	const isDateDisabled = (date) => {
		const today = new Date();
		const dateStr = date.toISOString().split("T")[0];
		const todayStr = today.toISOString().split("T")[0];
		return dateStr < todayStr || bookedDatesFinal.includes(date.toDateString());
	};

	const isRangeDisabled = (range) => {
		const { from, to } = range;
		let currentDate = new Date(from);
		while (currentDate <= to) {
			if (isDateDisabled(currentDate)) {
				return true;
			}
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return false;
	};

	function handleRangeInForm(rangeFromLibrary) {
		if (isRangeDisabled(rangeFromLibrary)) {
			if (range.to != rangeFromLibrary.to)
				return handleRange({ from: range.to, to: null });
			else return handleRange({ from: range.from, to: null });
		}
		handleRange(rangeFromLibrary);
	}

	return (
		<div className="flex flex-col justify-between">
			<DayPicker
				className="pt-12 place-self-center"
				mode="range"
				min={minBookingLength + 1}
				max={maxBookingLength + 1}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				captionLayout="dropdown"
				numberOfMonths={2}
				selected={range}
				onSelect={handleRangeInForm}
				disabled={isDateDisabled}
			/>

			<div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
				<div className="flex items-baseline gap-4">
					<p className="flex gap-2 items-baseline">
						{discount > 0 ? (
							<>
								<span className="text-2xl">${regularPrice - discount}</span>
								<span className="line-through font-semibold text-primary-700">
									${regularPrice}
								</span>
							</>
						) : (
							<span className="text-2xl">${regularPrice}</span>
						)}
						<span className="">/night</span>
					</p>
					{numNights ? (
						<>
							<p className="bg-accent-600 px-3 py-2 text-2xl">
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p>
								<span className="text-lg font-bold uppercase">Total</span>{" "}
								<span className="text-2xl font-semibold">${cabinPrice}</span>
							</p>
						</>
					) : null}
				</div>

				{range?.from || range?.to ? (
					<button
						className="border border-primary-800 py-2 px-4 text-sm font-semibold"
						onClick={() => clearRange()}
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
}

export default DateSelector;
