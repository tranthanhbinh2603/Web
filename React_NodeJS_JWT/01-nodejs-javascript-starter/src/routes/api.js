const express = require("express");
const { registerUser, loginUser } = require("../services/userService");

const routerAPI = express.Router();

routerAPI.post("/register", registerUser);
routerAPI.post("/login", loginUser);

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')

// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI);

module.exports = routerAPI; //export default
