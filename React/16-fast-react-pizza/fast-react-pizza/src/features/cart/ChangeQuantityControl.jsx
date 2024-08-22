/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuality, increaseQuality } from "./cartSlice";

function ChangeQuantityControl({ id, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row items-center space-x-2">
      <Button type="round" onClick={() => dispatch(decreaseQuality(id))}>
        -
      </Button>
      <p>{currentQuantity}</p>
      <Button type="round" onClick={() => dispatch(increaseQuality(id))}>
        +
      </Button>
    </div>
  );
}

export default ChangeQuantityControl;
