import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/error";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
	{
		errorElement: <Error />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/dashboard", element: <Dashboard /> },
		],
	},
]);

function App() {
	// Cách 1:
	// const queryClient = new QueryClient({
	// 	defaultOptions: {
	// 		queries: {
	// 			staleTime: 0,
	// 		},
	// 	},
	// });
	return (
		// <QueryClientProvider client={queryClient}>
		// 	<ReactQueryDevtools initialIsOpen={false} />
		<RouterProvider router={router} />
		// </QueryClientProvider>
	);
}

export default App;
