import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export async function middleware(req) {
	const session = await auth();

	if (session?.user && req.nextUrl.pathname === "/login") {
		return NextResponse.redirect(new URL("/account", req.url));
	}

	if (!session?.user && req.nextUrl.pathname === "/account") {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/account", "/login"],
};
