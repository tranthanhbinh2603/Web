//Set production nếu chương trình thực hiện chạy chính thức
process.env.NODE_ENV = "development";

//Đoạn code này sẽ giúp lưu trữ khoá API Key an toàn cho môi trường production. LƯU LẠI!
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
//Cách lấy: process.env.//NAME_TO_GET

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const campgroundRoute = require("./routes/campground");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");
const flash = require("connect-flash");
const User = require("./models/user");

//Đoạn code này giúp chống lỗi SQL Ejection trong Mongoose
//Nên gán liền với init mongoose
//Install: npm i express-mongo-sanitize
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize());

//Đoạn code này sẽ chống tất cả 11 lỗ hổng cơ bản
//Install: npm i helmet
const helmet = require("helmet");
app.use(helmet({ contentSecurityPolicy: false }));

//Còn đây là helmet custom, chỉ hiểu biết mới làm, không hiểu biết thì chatgpt
// app.use(helmet());
// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudflare.com/",
//     "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://use.fontawesome.com/",
// ];
// const connectSrcUrls = [
//     "https://api.mapbox.com/",
//     "https://a.tiles.mapbox.com/",
//     "https://b.tiles.mapbox.com/",
//     "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [];
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/douqbebwk/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
//                 "https://images.unsplash.com/",
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const session = require("express-session");

const mongoose = require("mongoose");

//Cấu hình lệnh ở kết nối máy chủ, đã thêm cách để kết nối mongoDB Atlas
let connectString = "";
if (process.env.NODE_ENV !== "production") {
	connectString = "mongodb://127.0.0.1:27017/yelpCampDB";
} else {
	connectString = process.env.MongoDBAtlasStringConnect; //Cấu hình link connect MongoDB Atlas ở đây
}
mongoose
	.connect(connectString)
	.then(() => {})
	.catch((e) => {
		console.log("Error when connect");
		console.log(`This is error: ${e}`);
	});

//Thực hiện lưu dữ liệu người dùng vào database luôn cho gọn
// Install : npm install connect-mongo@latest
const MongoStore = require("connect-mongo");
const store = MongoStore.create({
	mongoUrl: connectString,
	touchAfter: 1000 * 60 * 24 * 24 * 7,
	crypto: {
		secret: "YelpCampSecretKey",
	},
});
store.on("error", (e) => {
	console.log(`Session Store Error, Error Is: ${e}`);
});

app.use(
	session({
		store,
		name: "ThisIsSafeNameKey", //Thêm trường này để tăng tính an toàn
		secret: "YelpCampSecretKey",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			expires: Date.now() + 1000 * 60 * 24 * 24 * 7,
			maxAge: 1000 * 60 * 24 * 24 * 7,
		},
	})
);

//Đoạn code này luôn được để dưới đoạn code khai báo session
const passport = require("passport");
const LocalStrategy = require("passport-local");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// app.get("/fakeUser", async (req, res) => {
// 	const user = new User({
// 		email: "a@gmail.com",
// 		username: "hoho",
// 	});
// 	const data = await User.register(user, "thisIsPAsSWord");
// 	res.send(data);
// });

app.use("/", campgroundRoute);
app.use("/", userRoute);
app.use("/campground/:id/review", reviewRoute);

app.use((req, res) => {
	res.render("home");
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
	res.status(status).render("./error", { err });
});

app.listen(5050, () => {
	console.log("Finish start server");
	console.log("===========================");
});
