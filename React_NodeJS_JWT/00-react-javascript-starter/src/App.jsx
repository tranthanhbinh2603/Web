import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layouts/applayout";
import Error from "./components/layouts/error";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import { useState } from "react";

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

function App() {
	const [current, setCurrent] = useState("home");
	const router = createBrowserRouter([
		{
			element: <AppLayout current={current} setCurrent={setCurrent} />,
			errorElement: <Error />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/register", element: <Register setCurrent={setCurrent} /> },
				{ path: "/login", element: <Login setCurrent={setCurrent} /> },
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
	return <RouterProvider router={router} />;
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
