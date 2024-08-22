/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";
import ChangeQuantityControl from "./ChangeQuantityControl";
import DeleteCartItem from "./DeleteCartItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="sm py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <ChangeQuantityControl id={pizzaId} currentQuantity={quantity} />
        <DeleteCartItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
