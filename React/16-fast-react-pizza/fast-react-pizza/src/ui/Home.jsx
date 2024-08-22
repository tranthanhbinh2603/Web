import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.userName);

  return (
    <div className="py-10 text-center text-xl text-black">
      <h1 className="pb-8 font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Go to the menu, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
