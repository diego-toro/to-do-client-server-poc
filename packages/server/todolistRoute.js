const express = require("express");
const controller = require("./todolistController");

const todolistRoutes = express.Router();

todolistRoutes.get("/", controller.index);
todolistRoutes.get("/:id", controller.show);
todolistRoutes.post("/", controller.create);
todolistRoutes.put("/:id", controller.update);
todolistRoutes.delete("/:id", controller.destroy);

module.exports = todolistRoutes;
