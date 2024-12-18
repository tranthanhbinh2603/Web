import "./globals.css";
import localFont from "next/font/local";

const Segoe_UI = localFont({
	src: "./font/Segoe UI.ttf",
	display: "swap",
});

export const metadata = {
	title: "Ticket App - Fast & Easy Event, Movie, and Travel Ticket Booking",
	description:
		"Book event, movie, and travel tickets quickly and securely with Ticket App. Enjoy seamless online booking, secure payments, and the latest ticket updates.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={Segoe_UI.className}>{children}</body>
		</html>
	);
}
