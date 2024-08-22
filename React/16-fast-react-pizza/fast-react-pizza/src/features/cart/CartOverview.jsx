import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { Link } from "react-router-dom";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  return (
    <div className="flex flex-row justify-between bg-slate-700 p-4 text-white">
      <p className="space-x-4 uppercase">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice.toFixed(2)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
