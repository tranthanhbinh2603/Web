import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import CheckIn from "./pages/Check-in";
import { DarkModeProvider } from "./context/DarkModeContext";
import { lazy, Suspense } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Booking = lazy(() => import("./pages/Booking"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Settings = lazy(() => import("./pages/Settings"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<>
			<DarkModeProvider>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<GlobalStyles />
					<BrowserRouter>
						<Suspense>
							<Routes>
								<Route path="login" element={<Login />} />
								<Route
									element={
										<ProtectedRoute>
											<AppLayout />
										</ProtectedRoute>
									}
								>
									<Route index element={<Navigate replace to="dashboard" />} />
									<Route path="dashboard" element={<Dashboard />} />
									<Route path="bookings" element={<Bookings />} />
									<Route path="booking/:bookingId" element={<Booking />} />
									<Route path="check-in/:checkInId" element={<CheckIn />} />
									<Route path="cabins" element={<Cabins />} />
									<Route path="users" element={<Users />} />
									<Route path="Account" element={<Account />} />
									<Route path="settings" element={<Settings />} />
									<Route path="*" element={<PageNotFound />} />
								</Route>
							</Routes>
						</Suspense>
					</BrowserRouter>
				</QueryClientProvider>
				<Toaster
					position="bottom-right"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},

						error: {
							duration: 5000,
						},

						style: {
							fontSize: "16px",
							maxWidth: "500px",
							padding: "16px 24px",
							backgroundColor: "var(--color-grey-0)",
							color: "var(--color-grey-700)",
						},
					}}
				/>
			</DarkModeProvider>
		</>
	);
}

export default App;
