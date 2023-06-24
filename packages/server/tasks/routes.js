const express = require("express");
const controller = require("./controller");

const tasksRoutes = express.Router();

tasksRoutes.get("/", controller.index);
tasksRoutes.get("/:id", controller.show);
tasksRoutes.post("/", controller.create);
tasksRoutes.put("/:id", controller.update);
tasksRoutes.delete("/:id", controller.destroy);

module.exports = tasksRoutes;
