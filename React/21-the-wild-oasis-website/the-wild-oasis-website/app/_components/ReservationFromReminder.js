"use client";

import { useContext } from "react";
import { ReservationContext } from "./ReservationContext";

export function ReminderChoosingDate() {
	const { range } = useContext(ReservationContext);

	if (range.from === null || range.to === null) {
		return <p className="text-primary-300 text-base">Please selected date</p>;
	}
	return <></>;
}
