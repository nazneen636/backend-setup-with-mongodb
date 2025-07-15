const express = require("express");
const app = new express();
const userController = require("./controller/user.controller");
const createController = require("./controller/category.controller");

// json parse malware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes define
app.post("/registration", userController.registration);
app.post("/login", userController.login);
app.post("/create-category", createController.createCategory);
app.get("/all-category", createController.getAllCategory);
app.get("/single-category/:name", createController.getSingleCategory);
app.put("/update-category/:id", createController.updateCategory);
app.delete("/delete-category/:id", createController.deleteCategory);

module.exports = { app };
