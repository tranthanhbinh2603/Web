import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuality } from "../cart/cartSlice";
import DeleteCartItem from "../cart/DeleteCartItem";
import ChangeQuantityControl from "../cart/ChangeQuantityControl";

/* eslint-disable react/prop-types */
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => state.cart.cart);
  const isHaveInCart = currentCart.filter((item) => item.pizzaId === id).length;
  const filteredItems = currentCart.filter((item) => item.pizzaId === id);
  const currentQuantity =
    filteredItems.length > 0 ? filteredItems[0].quantity : 0;

  function handleAddPizza() {
    if (isHaveInCart) return dispatch(increaseQuality(id));
    const newPizza = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newPizza));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`w-20 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
        loading="lazy"
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="font-stone-500 text-sm capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex flex-row items-center justify-between">
          {!soldOut ? (
            <>
              <p className="text-sm">{formatCurrency(unitPrice)}</p>
              <div className="space-x-4">
                {isHaveInCart ? (
                  <div className="flex flex-row items-center space-x-4">
                    <ChangeQuantityControl
                      id={id}
                      currentQuantity={currentQuantity}
                    />
                    <DeleteCartItem id={id} />
                  </div>
                ) : (
                  <Button type="small" onClick={handleAddPizza}>
                    Add to cart
                  </Button>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm uppercase text-stone-500">Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
