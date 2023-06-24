const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const taskRoutes = require("./tasks/routes");
app.use("/api/tasks", taskRoutes);

const labelRoutes = require("./labels/routes");
app.use("/api/labels", labelRoutes);

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
