/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiLogin";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	const { isLoading, data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	useEffect(() => {
		if (user?.user?.role !== "authenticated" && !isLoading) navigate("/login");
	}, [user?.user?.role, isLoading, navigate]);

	if (isLoading) return <Spinner />;

	if (user?.user?.role === "authenticated") return children;
}

export default ProtectedRoute;
