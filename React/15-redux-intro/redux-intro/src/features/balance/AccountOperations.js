import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./BalanceSlice";

function AccountOperations() {
	const [depositAmount, setDepositAmount] = useState("");
	const [withdrawalAmount, setWithdrawalAmount] = useState("");
	const [loanAmount, setLoanAmount] = useState("");
	const [loanPurpose, setLoanPurpose] = useState("");
	const [currency, setCurrency] = useState("USD");
	const dispatch = useDispatch();
	const currentAmount = useSelector((state) => state.balance.balance);
	const currentLoan = useSelector((state) => state.balance.loan);
	const isUpdating = useSelector((state) => state.balance.isLoading);

	function handleDeposit() {
		dispatch(deposit(depositAmount, currency));
	}

	function handleWithdrawal() {
		if (withdrawalAmount > currentAmount) return;
		dispatch(withdraw(withdrawalAmount));
	}

	function handleRequestLoan() {
		// dispatch(requestLoan(loanAmount, loanPurpose));
		if (!loanAmount || !loanPurpose) return;
		dispatch(requestLoan(loanAmount, loanPurpose));
		setLoanAmount("");
		setLoanPurpose("");
	}

	function handlePayLoan() {
		if (currentLoan > currentAmount) return;
		dispatch(payLoan());
	}

	if (isUpdating)
		return (
			<div>
				<h2>Current update balance...</h2>
			</div>
		);
	return (
		<div>
			<h2>Your account operations</h2>
			<div className="inputs">
				<div>
					<label>Deposit</label>
					<input
						type="number"
						value={depositAmount}
						onChange={(e) => setDepositAmount(+e.target.value)}
					/>
					<select
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
					>
						<option value="USD">US Dollar</option>
						<option value="EUR">Euro</option>
						<option value="GBP">British Pound</option>
					</select>

					<button onClick={handleDeposit}>Deposit {depositAmount}</button>
				</div>

				<div>
					<label>Withdraw</label>
					<input
						type="number"
						value={withdrawalAmount}
						onChange={(e) => setWithdrawalAmount(+e.target.value)}
					/>
					<button onClick={handleWithdrawal}>
						Withdraw {withdrawalAmount}
					</button>
				</div>

				{currentLoan === 0 ? (
					<div>
						<label>Request loan</label>
						<input
							type="number"
							value={loanAmount}
							onChange={(e) => setLoanAmount(+e.target.value)}
							placeholder="Loan amount"
						/>
						<input
							value={loanPurpose}
							onChange={(e) => setLoanPurpose(e.target.value)}
							placeholder="Loan purpose"
						/>
						<button onClick={handleRequestLoan}>Request loan</button>
					</div>
				) : (
					<></>
				)}

				{currentLoan > 0 ? (
					<div>
						<span>Pay back ${currentLoan} </span>
						<button onClick={handlePayLoan}>Pay loan</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default AccountOperations;
