import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	return (
		<header class="header">
			<div>
				<h1>Fast React Pizza Co</h1>
			</div>
		</header>
	);
}

function Menu() {
	const numPizzas = pizzaData.length;
	return (
		<main className="menu">
			<h2>Our menu</h2>
			{numPizzas ? (
				<>
					<p>
						Authentic Italian cuisine. 6 creative dishes to choose from. All
						from our stone oven, all organic, all delicious.
					</p>
					<ul class="pizzas">
						{pizzaData.map((pizza) => {
							return <Pizza pizzaObj={pizza} />;
						})}
					</ul>
				</>
			) : (
				<p>We are still working for the menu</p>
			)}
		</main>
	);
}

function Footer() {
	const openHour = 8;
	const closeHour = 22;
	const currentHour = new Date().getHours();
	const isOpen = currentHour >= openHour && currentHour <= closeHour;
	return (
		<div class="footer">
			{isOpen ? (
				<div className="order">
					<p style={{ color: "black" }}>
						We're open until {closeHour}:00. Come visit us until order online.
					</p>
					<button className="btn">Order</button>
				</div>
			) : (
				<p>
					We are happy to welcome between {openHour}:00 to {closeHour}:00.
				</p>
			)}
		</div>
	);
}

function Pizza({ pizzaObj }) {
	return (
		<li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
			<img src={pizzaObj.photoName} alt="" loading="lazy"></img>
			<div>
				<h3>{pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				<span>${pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
			</div>
		</li>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
