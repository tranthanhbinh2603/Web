import "@/app/_styles/globals.css";
import localFont from "next/font/local";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const Josefin_Sans = localFont({
	src: "./_styles/font/JosefinSans-VariableFont_wght.ttf",
	display: "swap",
});

export const metadata = {
	title: {
		template: "%s | The Wild Oasis", // Đảm bảo placeholder này hoạt động đúng
		default: "Welcome | The Wild Oasis",
	},
	description:
		"Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${Josefin_Sans.className} flex flex-col min-h-screen bg-primary-950 text-accent-50 antialiased`}
			>
				<Header />
				<div className="flex-1 px-8 py-12 grid min-w-full">
					<main className="max-w-7xl h-full w-full mx-auto">
						<ReservationProvider>{children}</ReservationProvider>
					</main>
				</div>
				<footer>Copyright by The Wild Oasis</footer>
			</body>
		</html>
	);
}
