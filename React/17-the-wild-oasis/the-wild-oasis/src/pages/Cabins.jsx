// import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Modal from "../ui/Modal";
import CabinTableOperation from "../features/cabins/TableOperations";

function Cabins() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<CabinTableOperation />
			</Row>
			<Row>
				<CabinTable />
				<div>
					<Modal>
						<Modal.Open>
							<Button>Add new cabin</Button>
						</Modal.Open>
						<Modal.Window>
							<CreateCabinForm />
						</Modal.Window>
					</Modal>
				</div>
			</Row>
		</>
	);
}

export default Cabins;
