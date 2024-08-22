import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
	const session = await auth();
	return (
		<nav className="z-10 text-xl">
			<ul className="flex gap-16 items-center">
				<li>
					<Link
						href="/cabins"
						className="hover:text-accent-400 text-primary-50 transition-colors"
					>
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 text-primary-50 transition-colors"
					>
						About
					</Link>
				</li>
				<li>
					{session?.user?.image ? (
						<Link
							href="/account"
							className="hover:text-accent-400 text-primary-50 transition-colors flex items-center justify-center gap-4"
						>
							<Image
								src={session?.user?.image}
								alt="User Image"
								width={48}
								height={48}
								quality={50}
								className="object-cover rounded-full"
							/>
							{session?.user?.name}
						</Link>
					) : (
						<Link
							href="/account"
							className="hover:text-accent-400 text-primary-50 transition-colors"
						>
							Login
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}
