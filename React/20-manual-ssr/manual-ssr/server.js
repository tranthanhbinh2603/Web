const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const helmet = require("helmet");
const { renderToString } = require("react-dom/server");
const React = require("react");
import { hydrateRoot } from "react-dom/client";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(helmet({ contentSecurityPolicy: false }));

const pizzas = [
	{
		name: "Focaccia",
		price: 6,
	},
	{
		name: "Pizza Margherita",
		price: 10,
	},
	{
		name: "Pizza Spinaci",
		price: 12,
	},
	{
		name: "Pizza Funghi",
		price: 12,
	},
	{
		name: "Pizza Prosciutto",
		price: 15,
	},
];

function Home() {
	return (
		<div>
			<h1>🍕 Fast React Pizza Co.</h1>
			<p>This page has been rendered with React on the server 🤯</p>

			<h2>Menu</h2>
			<ul>
				{pizzas.map((pizza) => (
					<MenuItem pizza={pizza} key={pizza.name} />
				))}
			</ul>
		</div>
	);
}

function Counter() {
	const [count, setCount] = React.useState(0);
	return (
		<div>
			<button onClick={() => setCount((c) => c + 1)}>+1</button>
			<span>{count}</span>
		</div>
	);
}

function MenuItem({ pizza }) {
	return (
		<li>
			<h4>
				{pizza.name} (${pizza.price})
			</h4>
			<Counter />
		</li>
	);
}

class AppError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
	}
}

function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch((e) => next(e));
	};
}

// =====================================

// CONNECT DATABASE HERE

// YOUR REDIRECT MIDDLEWARE HERE (Example if the path is not define method....)

// YOUR MAIN REDIRECT HERE

app.get("/", (req, res) => {
	// res.render("index", { myVariable: renderToString(<Home />) });
	hydrateRoot(document.getElementsByTagName("body"), <Home />);
	// ReactDOM.hydrateRoot(document.getElementsByTagName("body"), <Home />);

	res.send(renderToString(<Home />));
});

app.get("/test", (req, res) => {
	res.render("index", { myVariable: "TEST" });
});

// YOUR CATCH IN DATABASE MONGO HERE

// =====================================

app.use((req, res) => {
	res.status(404).render("index", { myVariable: "The URL cannot be found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Something Went Wrong" } = err;
	console.log("ERROR FOUND!");
	console.log("URL Client Request:", req.ip);
	console.log("Method:", req.method);
	console.log("Url:", req.originalUrl);
	console.log("Status:", res.statusCode);
	console.log("Res:", res.getHeader("Content-Length"));
	console.log("Response time:", res.getHeader("X-Response-Time"));
	console.log("User-agent:", req.get("User-Agent"));
	console.log("Error: ", err);
	console.log("===========================");
	res.status(status).send(message);
});

app.listen(8000, () => {
	console.log("Finish start server");
	console.log("===========================");
});
