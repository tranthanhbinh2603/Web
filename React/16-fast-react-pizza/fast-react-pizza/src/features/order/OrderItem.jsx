/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";

//function OrderItem({ item, isLoadingIngredients, ingredients }) {
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <p>
          <span>{quantity}&times;</span> {name}
          {isLoadingIngredients ? (
            <p className="text-sm italic opacity-80">Loading...</p>
          ) : (
            <p className="text-sm italic opacity-80">
              {ingredients.join(", ")}
            </p>
          )}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
