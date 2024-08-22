import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useLoadCabin from "./useLoadCabin";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
	const { isLoading, isError, cabins } = useLoadCabin();
	const [searchParams] = useSearchParams();
	if (isLoading) return <Spinner />;
	else if (isError) throw new Error(isError);
	const filterValue = searchParams.get("filter") ?? "all";
	let finalCabins = cabins;
	if (filterValue === "no-discount") {
		finalCabins = cabins.filter((item) => item.discount === 0);
	} else if (filterValue === "with-discount") {
		finalCabins = cabins.filter((item) => item.discount !== 0);
	}
	const sortValue = searchParams.get("sort") ?? "sort-by-time";
	if (sortValue !== "sort-by-time") {
		const nameColumnSort = sortValue.split("-")[0];
		const typeColumnSort = sortValue.split("-")[1] === "asc" ? 1 : -1;
		finalCabins.sort((a, b) => {
			if (
				typeof a[nameColumnSort] === "string" &&
				typeof b[nameColumnSort] === "string"
			) {
				return (
					a[nameColumnSort].localeCompare(b[nameColumnSort]) * typeColumnSort
				);
			} else {
				return (a[nameColumnSort] - b[nameColumnSort]) * typeColumnSort;
			}
		});
	}

	return (
		<Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Table.Header>
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>
			<Table.Body
				columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"
				data={finalCabins}
				render={(cabin) => {
					return <CabinRow cabin={cabin} key={cabin.id} />;
				}}
			/>
		</Table>
	);
}

export default CabinTable;
