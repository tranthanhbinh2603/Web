import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CardOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../features/cart/cartSlice";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  return (
    <div className="layout grid h-screen grid-rows-[auto_1fr_auto] font-custom">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      {totalCartQuantity && totalCartPrice ? <CardOverview /> : <></>}
    </div>
  );
}

export default AppLayout;
