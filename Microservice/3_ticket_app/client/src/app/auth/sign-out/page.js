"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useRequest from "../../../customHook/useRequest";

function SignOutPage() {
	const { sendRequest } = useRequest();
	const router = useRouter();

	useEffect(() => {
		const signOut = async () => {
			await sendRequest("/api/users/sign-out", "POST", {}, async () => {
				await new Promise((resolve) => setTimeout(resolve, 200));
				document.body.innerHTML = "";
				setTimeout(() => {
					window.location.href = "/";
				}, 0);
			});
		};
		signOut();
	}, [sendRequest, router]);
	return null;
}

export default SignOutPage;
