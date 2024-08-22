import { useSelector } from "react-redux";
import CreateCustomer from "./features/account/CreateCustomer";
import Customer from "./features/account/Customer";
import AccountOperations from "./features/balance/AccountOperations";
import BalanceDisplay from "./features/balance/BalanceDisplay";

function App() {
	const customerName = useSelector((store) => store.account.fullName);

	return (
		<div>
			<h1>🏦 The React-Redux Bank ⚛️</h1>
			{customerName === "" ? (
				<CreateCustomer />
			) : (
				<>
					<Customer />
					<AccountOperations />
					<BalanceDisplay />
				</>
			)}
		</div>
	);
}

export default App;
