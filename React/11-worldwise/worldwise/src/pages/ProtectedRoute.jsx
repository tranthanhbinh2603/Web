import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/FakeAuthContext";

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
	const { isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticated) navigate("/");
		},
		[isAuthenticated, navigate]
	);

	return isAuthenticated ? children : null;
}

export default ProtectedRoute;
