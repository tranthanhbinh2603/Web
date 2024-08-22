import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import Filter from "./Filter";

async function CabinsList({ filter }) {
	noStore();
	let cabins = await getCabins();
	if (filter === "all") cabins = cabins;
	else if (filter === "small")
		cabins = cabins.filter((cabin) => {
			return cabin.maxCapacity >= 1 && cabin.maxCapacity <= 3;
		});
	else if (filter === "medium")
		cabins = cabins.filter((cabin) => {
			return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
		});
	else if (filter === "large")
		cabins = cabins.filter((cabin) => {
			return cabin.maxCapacity >= 8;
		});

	if (cabins.length === 0) return null;
	return (
		<>
			<Filter />
			<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
				{cabins.map((cabin) => (
					<CabinCard cabin={cabin} key={cabin.id} />
				))}
			</div>
		</>
	);
}

export default CabinsList;
