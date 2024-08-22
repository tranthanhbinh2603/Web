"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const activeFilter = searchParams.get("capacity") ?? "all";

	function handleFilter(filter) {
		const params = new URLSearchParams(searchParams);
		params.set("capacity", filter);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	return (
		<div className="flex justify-end">
			<div className="border border-primary-800 flex flex-end mb-4">
				<button
					className={`px-5 py-2 hover:bg-primary-700 ${
						activeFilter === "all" ? "bg-primary-500" : ""
					}`}
					onClick={() => handleFilter("all")}
				>
					All cabins
				</button>
				<button
					className={`px-5 py-2 hover:bg-primary-700 ${
						activeFilter === "small" ? "bg-primary-500" : ""
					}`}
					onClick={() => handleFilter("small")}
				>
					1 &mdash; 3 guests
				</button>
				<button
					className={`px-5 py-2 hover:bg-primary-700 ${
						activeFilter === "medium" ? "bg-primary-500" : ""
					}`}
					onClick={() => handleFilter("medium")}
				>
					4 &mdash; 7 guests
				</button>
				<button
					className={`px-5 py-2 hover:bg-primary-700 ${
						activeFilter === "large" ? "bg-primary-500" : ""
					}`}
					onClick={() => handleFilter("large")}
				>
					8 guests or more
				</button>
			</div>
		</div>
	);
}

export default Filter;
