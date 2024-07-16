import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />}></Route>
				<Route path="/product" element={<Product />}></Route>
				<Route path="/pricing" element={<Pricing />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/app" element={<AppLayout />}>
					<Route path="cities" element={<p>This is cities</p>}></Route>
					<Route path="countries" element={<p>This is countries</p>}></Route>
					<Route path="form" element={<p>This is form</p>}></Route>
				</Route>
				<Route path="*" element={<PageNotFound />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
