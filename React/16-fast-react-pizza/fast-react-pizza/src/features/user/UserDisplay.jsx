import { useSelector } from "react-redux";

function UserDisplay() {
  const username = useSelector((state) => state.user.userName);
  if (!username) return <p className="hidden md:block">Hello, guest</p>;
  return <p className="hidden md:block">Hello, {username}</p>;
}

export default UserDisplay;
