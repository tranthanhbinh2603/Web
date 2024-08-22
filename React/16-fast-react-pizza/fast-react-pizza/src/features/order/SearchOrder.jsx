import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  function searchOrder(e) {
    e.preventDefault();
    if (orderId === "") return;
    navigate(`/order/${orderId}`);
    setOrderId("");
  }
  return (
    <form onSubmit={searchOrder}>
      <input
        className="placeholder:text-brown-400 w-45 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 focus:w-60 focus:outline-none focus:ring focus:ring-yellow-500 md:w-60 md:text-center md:focus:w-96"
        placeholder="Search Order #"
        onChange={(e) => setOrderId(e.target.value)}
      ></input>
    </form>
  );
}

export default SearchOrder;
