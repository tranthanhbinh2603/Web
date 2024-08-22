import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
	return (
		<>
			<Heading as="h1">Update hotel settings</Heading>
			<UpdateSettingsForm />
		</>
	);
}

export default Settings;
