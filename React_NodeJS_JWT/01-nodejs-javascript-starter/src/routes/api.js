const express = require("express");
const { registerUser, loginUser } = require("../services/authService");
const { getUsers, getInfoUser } = require("../services/userService");
const checkAuthentication = require("../middleware/auth");

const routerAPI = express.Router();

routerAPI.post("/register", registerUser);
routerAPI.post("/login", loginUser);
routerAPI.post("/info_user", checkAuthentication, getInfoUser);

routerAPI.get("/users", checkAuthentication, getUsers);

module.exports = routerAPI; //export default
