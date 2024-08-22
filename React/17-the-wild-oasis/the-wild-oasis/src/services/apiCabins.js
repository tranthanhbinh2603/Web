import supabase from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");
	if (error) {
		throw new Error("There is a problem when get cabins");
	}
	for (const item of data) {
		const { data: urlImageData, error: errorGetLinkImage } =
			await supabase.storage
				.from("cabin-images")
				.createSignedUrl(item.image, 60, {
					transform: {
						width: 100,
						height: 100,
					},
				});
		if (errorGetLinkImage) {
			throw new Error("Sorry, we do not load image now");
		}
		item.imageURL = urlImageData.signedUrl;
	}
	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		throw new Error("There is a problem when delete a cabin");
	}
	return data;
}

export async function addCabin(data) {
	const imageName = (Date.now() + " - " + data.image.name).slice(0, 100);
	const { errorUpload } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, data.image, {
			cacheControl: "3600",
			upsert: false,
		});
	if (errorUpload) {
		throw new Error("There is a problem when upload image of the cabin");
	}
	const { dataResult, error } = await supabase
		.from("cabins")
		.insert([{ ...data, image: imageName }])
		.select();
	if (error) {
		throw new Error("There is a problem when create a cabin");
	}
	return dataResult;
}

export async function editCabin(data) {
	const { oldFileName } = data;
	delete data.imageURL;
	delete data.oldFileName;
	const imageName =
		typeof data.image === "string"
			? data.image
			: (Date.now() + " - " + data.image?.name).slice(0, 100);
	if (data.image?.name) {
		const { errorDelete } = await supabase.storage
			.from("cabin-images")
			.remove([oldFileName]);
		if (errorDelete) {
			throw new Error("There is a problem when delete old cabin image");
		}
		const { errorUpload } = await supabase.storage
			.from("cabin-images")
			.upload(imageName, data.image, {
				cacheControl: "3600",
				upsert: false,
			});
		if (errorUpload) {
			throw new Error("There is a problem when upload image of the cabin");
		}
	}
	const { dataResult, error } = await supabase
		.from("cabins")
		.update([{ ...data, image: imageName }])
		.eq("id", data.id)
		.select();
	if (error) {
		throw new Error("There is a problem when edit a cabin");
	}
	return dataResult;
}

export async function duplicateCabin(data) {
	delete data.imageURL;
	delete data.id;
	delete data.createAt;
	data.name = "Copy of " + data.name;
	const { dataResult, error } = await supabase
		.from("cabins")
		.insert([{ ...data }])
		.select();
	if (error) {
		throw new Error("There is a problem when duplicate a cabin");
	}
	return dataResult;
}
