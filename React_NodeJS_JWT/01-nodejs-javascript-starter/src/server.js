require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const apiRoutes = require("./routes/api");
var cors = require("cors");
const connection = require("./config/database");
const { getHomepage } = require("./controllers/homeController");
const { bold } = require("kleur");

const app = express();
const port = process.env.PORT || 8888;

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

//Fix lôi CORS khi load từ front-end lên back-end
var whitelist = [
	"http://localhost:5173",
	"chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld",
	"http://localhost:4173",
];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			console.log(bold().red(`[Block user CORS] ${origin}`));
			callback(new Error("Not allowed by CORS"));
		}
	},
};
app.use(cors(corsOptions));

//khai báo route
app.use("/v1/api/", apiRoutes);
app.use("/", getHomepage);

(async () => {
	try {
		//using mongoose
		await connection();

		app.listen(port, () => {
			console.log(`Backend Nodejs App listening on port ${port}`);
		});
	} catch (error) {
		console.log(">>> Error connect to DB: ", error);
	}
})();
