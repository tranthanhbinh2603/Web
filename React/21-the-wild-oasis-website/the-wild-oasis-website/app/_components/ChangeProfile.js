import Image from "next/image";
import { auth } from "../_lib/auth";
import { getGuest } from "../_lib/data-service";
import SelectCountry from "./SelectCountry";
import { ChangeUserInfo } from "../_lib/action";
import { ChangeProfileButton as Button } from "./ChangeProfileButton";

async function ChangeProfile() {
	const session = await auth();
	const dataGuest = await getGuest(session.user.email);

	const { countryFlag, nationality, nationalID, fullName, email } = dataGuest;

	return (
		<form
			className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
			action={ChangeUserInfo}
			method="POST"
		>
			<input type="hidden" name="guestId" value={session.user.guestId} />
			<div className="space-y-2">
				<label>Full name</label>
				<input
					disabled
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
					defaultValue={fullName}
				/>
			</div>

			<div className="space-y-2">
				<label>Email address</label>
				<input
					disabled
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
					defaultValue={email}
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					<div className="flex items-center justify-center gap-2">
						<div className="relative h-4 w-5">
							<Image
								src={countryFlag}
								fill
								alt="Country flag"
								className="h-5 rounded-sm"
							/>
						</div>
						<p>{nationality}</p>
					</div>
				</div>

				<SelectCountry
					name="nationality"
					id="nationality"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
					defaultCountry={nationality}
				/>
			</div>

			<div className="space-y-2">
				<label htmlFor="nationalID">National ID number</label>
				<input
					name="nationalID"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
					defaultValue={nationalID}
				/>
			</div>

			<Button />
		</form>
	);
}

export default ChangeProfile;
