import { useSelector } from "react-redux";

function formatCurrency(value) {
	return new Intl.NumberFormat("en", {
		style: "currency",
		currency: "USD",
	}).format(value);
}

function BalanceDisplay() {
	const currentAmount = useSelector((state) => state.balance.balance);
	const isUpdating = useSelector((state) => state.balance.isLoading);
	if (isUpdating) return <div className="balance">Updating....</div>;
	return <div className="balance">{formatCurrency(currentAmount)}</div>;
}

export default BalanceDisplay;

// Đây là cách làm phức tạp hơn: Xoá dòng export default bên trên rồi uncomment đống dưới này
// function mapStateToProps(state) {
// 	return {
// 		balance: state.account.balance,
// 	};
// }
// export default connect(mapStateToProps)(BalanceDisplay);
