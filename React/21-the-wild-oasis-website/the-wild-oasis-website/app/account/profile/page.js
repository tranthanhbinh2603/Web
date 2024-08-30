import ChangeProfile from "@/app/_components/ChangeProfile";
// import SelectCountry from "@/app/_components/SelectCountry";
// import Image from "next/image";

export default function Page() {
	// CHANGE
	// const countryFlag = "pt.jpg";
	// const nationality = "portugal";

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-4">
				Update your guest profile
			</h2>

			<p className="text-lg mb-8 text-primary-200">
				Providing the following information will make your check-in process
				faster and smoother. See you soon!
			</p>

			<ChangeProfile />
		</div>
	);
}
