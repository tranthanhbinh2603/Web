import Link from "next/link";
import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
	]);
	const session = await auth();

	return (
		<div className="flex gap-12">
			<DateSelector
				settings={settings}
				cabin={cabin}
				bookedDates={bookedDates}
			/>

			{session?.user?.image ? (
				<ReservationForm
					settings={settings}
					cabin={cabin}
					user={session.user}
				/>
			) : (
				<LoginMessage />
			)}
		</div>
	);
}

export default Reservation;
