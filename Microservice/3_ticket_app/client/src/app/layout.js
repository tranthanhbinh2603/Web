import "./globals.css";
import localFont from "next/font/local";

const Segoe_UI = localFont({
	src: "../font/Segoe UI.ttf",
	display: "swap",
});

export const metadata = {
	title: "Ticket App - Fast & Easy Event, Movie, and Travel Ticket Booking",
	description:
		"Book event, movie, and travel tickets quickly and securely with Ticket App. Enjoy seamless online booking, secure payments, and the latest ticket updates.",
};

async function getCurrentUser() {
	return { name: "John Doe", email: "john@example.com" };
}

export default function RootLayout({ children }) {
	let currentUser = null;
	const setUser = (data) => {
		currentUser = data;
	};
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={Segoe_UI.className}>{children}</body>
		</html>
	);
}
