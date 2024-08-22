import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
	return (
		<ButtonIcon onClick={toggleDarkMode}>
			{isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
		</ButtonIcon>
	);
}

export default DarkModeToggle;
