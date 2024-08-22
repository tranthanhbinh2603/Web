/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import withAuthRedirect from "../user/AuthRedirect";

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((item) => {
        return <MenuItem pizza={item} key={item.id} />;
      })}
    </ul>
  );
}

export async function loader() {
  const data = await getMenu();
  return data;
}

export default withAuthRedirect(Menu);
