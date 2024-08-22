import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
	return (
		<CitiesProvider>
			<AuthProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<Homepage />}></Route>
							<Route path="/product" element={<Product />}></Route>
							<Route path="/pricing" element={<Pricing />}></Route>
							<Route path="/login" element={<Login />}></Route>
							<Route
								path="/app"
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
								<Route index element={<Navigate replace to="cities" />} />
								<Route path="cities" element={<CityList />}></Route>
								<Route path="cities/:id" element={<City />} />
								<Route path="countries" element={<CountryList />}></Route>
								<Route path="form" element={<Form />}></Route>
							</Route>
							<Route path="*" element={<PageNotFound />}></Route>
						</Routes>
					</Suspense>
				</BrowserRouter>
			</AuthProvider>
		</CitiesProvider>
	);
}

export default App;
