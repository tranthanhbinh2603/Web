import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperation() {
	return (
		<TableOperations>
			<Filter
				options={[
					{ value: "all", label: "All" },
					{ value: "no-discount", label: "No discount" },
					{ value: "with-discount", label: "With discount" },
				]}
			/>
			<SortBy
				options={[
					{ label: "Sort by time", value: "sort-by-time" },
					{ label: "Sort by name (A-Z)", value: "name-asc" },
					{ label: "Sort by name (Z-A)", value: "name-desc" },
					{ label: "Sort by price (low first)", value: "regularPrice-asc" },
					{ label: "Sort by price (high first)", value: "regularPrice-desc" },
					{ label: "Sort by capacity (low first)", value: "maxCapacity-asc" },
					{
						label: "Sort by capacity (high first)",
						value: "maxCapacity-desc",
					},
				]}
			/>
		</TableOperations>
	);
}

export default CabinTableOperation;
