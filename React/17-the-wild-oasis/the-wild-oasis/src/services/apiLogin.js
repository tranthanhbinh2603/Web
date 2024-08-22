import supabase from "../services/supabase";

export async function login(email, password) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		throw new Error("Invalid username or password");
	}

	return data;
}

export async function signIn(dataInput) {
	const { email, password, fullName } = dataInput;
	let { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				fullName: fullName,
				avatar: "",
			},
		},
	});

	if (error) {
		throw new Error("There is some error when sign up");
	}

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();
	if (error) return new Error(error.message);

	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		return new Error("Error when logout");
	}
}

function extractAndDecodeFilename(url) {
	// Updated regular expression to capture everything after the last slash up to the query parameters
	const regex = /\/([^/?]+)(\?|$)/;
	const match = url.match(regex);

	if (match && match[1]) {
		const encodedFilename = match[1];
		// Decode the encoded filename
		const decodedFilename = decodeURIComponent(encodedFilename);
		return decodedFilename;
	}

	return null; // Return null if no match is found
}

export async function changeInfoUser(data) {
	const { fullName, avatar, avatarFileName = "" } = data;

	let oldFileName = "";
	if (avatarFileName !== "") {
		oldFileName = extractAndDecodeFilename(avatarFileName);
	}
	const newFileName = (Date.now() + " - " + data.avatar[0]?.name).slice(0, 100);

	const { data: dataFinal, error: errorUpdateName } =
		await supabase.auth.updateUser({
			data: { fullName: fullName },
		});

	if (errorUpdateName) {
		return new Error("Error when update name");
	}

	if (avatarFileName !== "" && avatar.length) {
		const { errorChangeOldAvatar } = await supabase.storage
			.from("avatars")
			.update(oldFileName, avatar[0], {
				cacheControl: "3600",
				upsert: true,
			});
		if (errorChangeOldAvatar) {
			return new Error("Error when change old avatar");
		}
	} else if (avatar.length) {
		const { errorUploadNewAvatar } = await supabase.storage
			.from("avatars")
			.upload(newFileName, avatar[0], {
				cacheControl: "3600",
				upsert: false,
			});
		const { error: errorGetLinkImage, data: dataImage } = supabase.storage
			.from("avatars")
			.getPublicUrl(newFileName);
		console.log(dataImage);
		const { data: dataFinal, error: errorUpdateAvatarFileName } =
			await supabase.auth.updateUser({
				data: { avatar: dataImage.publicUrl },
			});
		if (
			errorUpdateAvatarFileName ||
			errorUploadNewAvatar ||
			errorGetLinkImage
		) {
			return new Error("Error when upload new avatar");
		}
		return dataFinal;
	}

	return dataFinal;
}

export async function changeUserPassword(data) {
	const { password } = data;
	const { data: dataFinal, error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		console.error("Error changing password:", error.message);
		throw new Error("Error changing password");
	}

	return dataFinal;
}
