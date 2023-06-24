const express = require("express");
const controller = require("./controller");

const labelsRoutes = express.Router();

labelsRoutes.get("/", controller.index);
labelsRoutes.get("/:id", controller.show);
labelsRoutes.post("/", controller.create);
labelsRoutes.put("/:id", controller.update);
labelsRoutes.delete("/:id", controller.destroy);

module.exports = labelsRoutes;
