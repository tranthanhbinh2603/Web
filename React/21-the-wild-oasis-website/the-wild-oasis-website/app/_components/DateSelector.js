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

function DateSelector({ settings, cabin }) {
	// CHANGE
	const regularPrice = cabin.regularPrice;
	const discount = cabin.discount;

	//2 số này sẽ là số đêm và tổng giá
	const numNights = 5;
	const cabinPrice = 500;

	// SETTINGS
	const minBookingLength = settings.minBookingLength;
	const maxBookingLength = settings.maxBookingLength;

	const { range, handleRange, clearRange } = useContext(ReservationContext);

	return (
		<div className="flex flex-col justify-between">
			<DayPicker
				className="pt-12 place-self-center"
				mode="range"
				min={minBookingLength + 1}
				max={maxBookingLength}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				captionLayout="dropdown"
				numberOfMonths={2}
				selected={range}
				onSelect={handleRange}
			/>

			<div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
				<div className="flex items-baseline gap-6">
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

				{range.from || range.to ? (
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
