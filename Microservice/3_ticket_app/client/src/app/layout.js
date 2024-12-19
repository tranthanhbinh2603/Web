import React from "react";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/header";

const Segoe_UI = localFont({
	src: "../font/Segoe UI.ttf",
	display: "swap",
});

export const metadata = {
	title: "Ticket App - Fast & Easy Event, Movie, and Travel Ticket Booking",
	description:
		"Book event, movie, and travel tickets quickly and securely with Ticket App. Enjoy seamless online booking, secure payments, and the latest ticket updates.",
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={Segoe_UI.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
