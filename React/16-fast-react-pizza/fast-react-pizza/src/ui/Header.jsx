import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserDisplay from "../features/user/UserDisplay";

function Header() {
  return (
    <header className="flex items-center justify-between border-b-4 border-stone-800 bg-yellow-500 px-4 py-3 uppercase tracking-widest">
      <Link href="/">Fast React Pizza Co.</Link>
      <SearchOrder />
      <UserDisplay />
    </header>
  );
}

export default Header;
