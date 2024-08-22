import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import Logout from "./Logout";
import { HiOutlineUser } from "react-icons/hi2";

function HeaderMenu() {
	const navigate = useNavigate();
	return (
		<>
			<ButtonIcon onClick={() => navigate("/account")}>
				<HiOutlineUser />
			</ButtonIcon>
			<Logout />
		</>
	);
}

export default HeaderMenu;
