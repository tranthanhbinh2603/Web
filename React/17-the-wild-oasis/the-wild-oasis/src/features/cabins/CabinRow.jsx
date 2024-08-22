/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import useDeleteCabin from "./useDeleteCabin";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import useDuplicateCabin from "./useDuplicateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img.attrs({
	loading: "lazy",
})`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

const ButtonGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1.2rem;
`;

function CabinRow({ cabin }) {
	const { name, maxCapacity, regularPrice, discount, imageURL, id } = cabin;
	const { isDeleting, mutate } = useDeleteCabin();
	const { isDuplicating, handleDuplicateCabin } = useDuplicateCabin();
	// const [showForm, setShowForm] = useState(false);
	// const handleButtonClick = () => {
	// 	setShowForm((showForm) => !showForm);
	// };
	const isWorking = isDuplicating || isDeleting;
	return (
		<>
			<TableRow>
				<Img src={imageURL} />
				<Cabin>{name}</Cabin>
				<div>Fits up to {maxCapacity} guests</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				<Discount>{discount !== 0 ? formatCurrency(discount) : "-"}</Discount>
				<ButtonGroup>
					<Button
						variation="primary"
						type="submit"
						onClick={() => handleDuplicateCabin(cabin)}
						disabled={isWorking}
					>
						🗐
					</Button>
					<Modal>
						<Modal.Open>
							<Button>✏️</Button>
						</Modal.Open>
						<Modal.Window>
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>
					</Modal>
					{/* <Button
						variation={showForm ? "secondary" : "primary"}
						type="submit"
						onClick={handleButtonClick}
						disabled={isWorking}
					>
						{showForm ? "❌" : "✏️"}
					</Button> */}
					<Modal>
						<Modal.Open>
							<Button variation="danger">🗑️</Button>
						</Modal.Open>
						<Modal.Window resourceName="cabin" onConform={() => mutate(id)}>
							<ConfirmDelete />
						</Modal.Window>
					</Modal>
					{/* <Button
						variation="danger"
						type="submit"
						onClick={() => mutate(id)}
						disabled={isWorking}
					>
						🗑️
					</Button> */}
				</ButtonGroup>
			</TableRow>

			{/* {showForm && (
				<CreateCabinForm
					handleButtonClick={handleButtonClick}
					cabinToEdit={cabin}
				/>
			)} */}
		</>
	);
}

export default CabinRow;
