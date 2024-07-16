import { useState } from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export default function App() {
	const [selectedID, setSelectedId] = useState(499476);
	const [listFriend, setListFriend] = useState(initialFriends);
	function handleAddFriend(data) {
		setListFriend([...listFriend, data]);
	}
	function handleSelectedID(id) {
		if (id === selectedID) setSelectedId(null);
		else setSelectedId(id);
	}
	function resetSelectedId(id) {
		setSelectedId(null);
	}
	function handleOweInList(id, value) {
		setListFriend(
			listFriend.map((item) => {
				if (item.id === id) {
					return { ...item, balance: item.balance + value };
				}
				return item;
			})
		);
	}
	const dataSelectedID =
		selectedID !== null
			? listFriend.filter((item) => item.id === selectedID)
			: { id: null };
	return (
		<div className="app">
			<ul className="sidebar">
				<Friends
					listFriend={listFriend}
					changeSelectedId={handleSelectedID}
					selectedID={selectedID}
				/>
				<FormAddFriend addFriend={handleAddFriend} />
			</ul>
			<FormSplitBill
				dataSelectedID={dataSelectedID[0]}
				setOweInList={handleOweInList}
				resetSelectedId={resetSelectedId}
			/>
		</div>
	);
}

function Friends({ listFriend, changeSelectedId, selectedID }) {
	return listFriend.map((item) => {
		return (
			<Friend
				item={item}
				changeSelectedId={changeSelectedId}
				selectedID={selectedID}
			/>
		);
	});
}

function Friend({ item, changeSelectedId, selectedID }) {
	return (
		<li className={selectedID === item.id ? "selected" : ""}>
			<img src={item.image} alt={item.name}></img>
			<h3>{item.name}</h3>
			{item.balance < 0 ? (
				<p className="red">
					You owe {item.name} ${Math.abs(item.balance)}
				</p>
			) : item.balance ? (
				<p className="green">
					{item.name} owe you ${Math.abs(item.balance)}
				</p>
			) : (
				<p>You and {item.name} are even</p>
			)}
			<button className="button" onClick={() => changeSelectedId(item.id)}>
				{selectedID === item.id ? "Close" : "Select"}
			</button>
		</li>
	);
}

function FormAddFriend({ addFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");
	const [isOpen, setIsOpen] = useState(false);
	function handleSubmit(e) {
		e.preventDefault();
		const newData = {
			id: Date.now(),
			name: name,
			image: image,
			balance: 0,
		};
		addFriend(newData);
	}
	function changeName(data) {
		setName(data);
	}
	function changeImage(data) {
		setImage(data);
	}
	function toggleOpen() {
		setIsOpen(!isOpen);
	}
	if (!isOpen) {
		return (
			<button className="button" onClick={toggleOpen}>
				Add friend
			</button>
		);
	}
	return (
		<>
			<form className="form-add-friend" onSubmit={handleSubmit}>
				<label>😊 Friend name</label>
				<input type="text" onChange={(e) => changeName(e.target.value)}></input>
				<label>😊 Image URL</label>
				<input
					type="text"
					onChange={(e) => changeImage(e.target.value)}
					value={image}
				></input>
				<button className="button">Add friend</button>
			</form>
			<button className="button" onClick={toggleOpen}>
				Close
			</button>
		</>
	);
}

function FormSplitBill({ dataSelectedID, setOweInList, resetSelectedId }) {
	const [bill, setBill] = useState(0);
	const [yourExpense, setYourExpense] = useState(0);
	const [whoPay, setWhoPay] = useState(0); //0 is you, 1 is friend

	if (dataSelectedID === undefined) return <div></div>;
	function sendOwe(e) {
		e.preventDefault();
		setOweInList(dataSelectedID.id, setOwe());
		resetSelectedId();
		setBill(0);
		setYourExpense(0);
		setWhoPay(0);
	}
	function setOwe() {
		if (Number(whoPay)) {
			return -1 * yourExpense;
		} else {
			return friendExpense;
		}
	}
	function changeBill(billValue) {
		setBill(billValue);
	}

	function changeYourExpense(value) {
		if (!isNaN(parseInt(value))) {
			if (parseInt(value) <= bill) {
				setYourExpense(parseInt(value));
			} else {
				setYourExpense(bill);
			}
		}
	}

	function changeWhoPay(id) {
		setWhoPay(id);
	}
	const friendExpense = bill - yourExpense;
	return (
		<form className="form-split-bill" onSubmit={sendOwe}>
			<h2>Split the bill with {dataSelectedID.name}</h2>

			<label>😊 Bill value</label>
			<input
				type="text"
				onChange={(e) => changeBill(e.target.value)}
				value={bill}
			></input>

			<label>😊 Your expense</label>
			<input
				type="text"
				onChange={(e) => changeYourExpense(e.target.value)}
				value={yourExpense}
			></input>

			<label>😊 {dataSelectedID.name}'s expense</label>
			<input type="text" disabled="true" value={friendExpense}></input>

			<label>😊 Who is paying the bill</label>
			<select onChange={(e) => changeWhoPay(e.target.value)} value={whoPay}>
				<option value={0}>You</option>
				<option value={1}>{dataSelectedID.name}</option>
			</select>

			<button className="button">Split bill</button>
		</form>
	);
}
