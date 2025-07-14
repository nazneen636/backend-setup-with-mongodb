const express = require("express");
const app = new express();
const userController = require("./controller/user.controller");

// json parse malware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes define
app.post("/registration", userController.registration);
app.post("/login", userController.login);
module.exports = { app };
