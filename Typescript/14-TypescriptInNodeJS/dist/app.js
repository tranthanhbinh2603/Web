"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const method_override_1 = __importDefault(require("method-override"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, method_override_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, method_override_1.default)("_method"));
app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
app.use((res) => {
    res.status(404).send("Page Not Found");
});
app.use((err, req, res) => {
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
app.listen(5050, () => {
    console.log("Finish start server");
    console.log("===========================");
});
//# sourceMappingURL=app.js.map