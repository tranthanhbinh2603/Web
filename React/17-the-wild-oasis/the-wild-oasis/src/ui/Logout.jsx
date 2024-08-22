import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../services/apiLogin";
import SpinnerMini from "./SpinnerMini";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Logout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { isLoading: isLogout, mutate: logout } = useMutation({
		mutationFn: logoutAPI,
		onSuccess: () => {
			navigate("/dashboard");
			queryClient.removeQueries();
			toast.success("Logout successful");
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});
	return (
		<ButtonIcon disabled={isLogout} onClick={logout}>
			{isLogout ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
		</ButtonIcon>
	);
}

export default Logout;
