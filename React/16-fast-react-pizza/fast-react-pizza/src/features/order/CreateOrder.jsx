/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { getTotalCartPrice, clearCart } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import store from "../../store";
import withAuthRedirect from "../user/AuthRedirect";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    address,
    state: addressStatus,
    error,
    position,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const navigation = useNavigation();
  const isOrdering = navigation.state === "loading";
  const cart = useSelector((state) => state.cart.cart);
  const orderPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? (orderPrice / 100) * 20 : 0;
  const totalPrice = orderPrice + priorityPrice;
  const formError = useActionData();
  const dispatch = useDispatch();
  function handleAddress(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-4 font-semibold">Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col sm:flex-row">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col sm:flex-row">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-start">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {!address ? (
              <span className="absolute right-[3px]">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={handleAddress}
                >
                  Get position
                </Button>
              </span>
            ) : null}
            {error && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-row items-center space-x-4">
          <input
            className="inline h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disable={isOrdering || isLoadingAddress} type="small">
            {isOrdering
              ? "Please waiting..."
              : `Order now with $${totalPrice.toFixed(2)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const formError = {};
  if (!isValidPhone(data.phone))
    formError.phone =
      "Your phone number appears to be invalid. Please check again.";

  if (Object.keys(formError).length > 0) return formError;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default withAuthRedirect(CreateOrder);
