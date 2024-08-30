//TODO: 2

"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { getBookings, updateGuest } from "./data-service";
import {
	deleteBooking as deleteBookingAPI,
	updateBooking,
} from "./data-service";
import { redirect } from "next/navigation";
import { createBooking as createBookingAPI } from "./data-service";

export async function ChangeUserInfo(dataform) {
	const session = await auth();
	if (!session) {
		throw new Error("Please login");
	}

	const [nationality, countryFlag] = String(dataform.get("nationality")).split(
		"%"
	);

	if (!/^[0-9\-. ]+$/.test(String(dataform.get("nationalID")))) {
		throw new Error("Wrong national ID, please input again");
	}

	const dataChange = {
		nationality: nationality,
		countryFlag: countryFlag,
		nationalID: dataform.get("nationalID"),
	};

	await updateGuest(dataform.get("guestId"), dataChange);

	revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
	const session = await auth();

	if (!session) {
		throw new Error("Please login");
	}

	const bookings = await getBookings(session?.user?.guestId);

	if (bookings.find((item) => item.id === bookingId)) {
		await deleteBookingAPI(bookingId);
		revalidatePath("/account/reservations");
	} else {
		throw new Error("You do not have permission to delete this booking");
	}
}

export async function editBooking(dataform) {
	const session = await auth();

	if (!session) {
		throw new Error("Please login");
	}

	const bookings = await getBookings(session?.user?.guestId);

	if (bookings.find((item) => item.id === Number(dataform.get("id")))) {
		const dataUpdate = {
			numGuests: String(dataform.get("numGuests")),
			observations: String(dataform.get("observations")),
		};
		await updateBooking(Number(dataform.get("id")), dataUpdate);
		revalidatePath("/account/reservations");
		redirect("/account/reservations");
	} else {
		throw new Error("You do not have permission to delete this booking");
	}
}

export async function createBooking(dataBooking, formData) {
	const session = await auth();
	if (!session) throw new Error("Please login");

	const dataSend = {
		...dataBooking,
		numGuests: Number(formData.get("numGuests")),
		totalPrice: dataBooking.cabinPrice,
		status: "unconfirmed",
		isPaid: false,
		observations: String(formData.get("observations")),
		extrasPrice: 0,
		guestId: session.user.guestId,
		hasBreakfast: false,
	};

	await createBookingAPI(dataSend);

	revalidatePath(`/cabins/${dataBooking.cabinId}`);

	redirect("/cabins/thankyou");
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
