import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layouts/applayout";
import Error from "./components/layouts/error";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import { useState } from "react";
import Users from "./components/users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// //You can custom here
// export async function searchOrderLoader({ params }) {
// 	const data = getOrder(params.orderId);
// 	return data;
// }

// //You can custom here
// function Order() {
// 	const order = useLoaderData();
// }

// //If you want non-redirect when form-send done, you need this
// export async function UpdateOrderAction({ request }) {
// 	const formData = await request.formData();
// 	const data = Object.fromEntries(formData);
// 	return null;
// }
// //Or, you need this, if you want redirect when form send done
// export async function action({ request }) {
// 	const formData = await request.formData();
// 	const data = Object.fromEntries(formData);
// 	//Do sth
// 	return redirect(`/order/${newOrder.id}`);
// }

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	const [current, setCurrent] = useState("home");
	const router = createBrowserRouter([
		{
			element: <AppLayout current={current} setCurrent={setCurrent} />,
			errorElement: <Error />,
			children: [
				{ path: "/", element: <Home setCurrent={setCurrent} /> },
				{ path: "/register", element: <Register setCurrent={setCurrent} /> },
				{ path: "/login", element: <Login setCurrent={setCurrent} /> },
				{ path: "/users", element: <Users setCurrent={setCurrent} /> },
				// {
				// 	path: "/order/:orderId", //Have placement for id
				// 	element: <Order />, //Element to repace in <Outlet />
				// 	loader: searchOrderLoader, //
				// 	errorElement: <Error />,
				// 	action: UpdateOrderAction,
				// },
			],
		},
	]);
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);
}

export default App;

// function App() {
// 	// useEffect(() => {
// 	// 	async function getAPI() {
// 	// 		const result = await axios.get("/v1/api/register");
// 	// 		console.log(result);
// 	// 	}
// 	// 	getAPI();
// 	// }, []);
// 	// return <></>;
// }

// export default App;
