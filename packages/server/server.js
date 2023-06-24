const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const todolistRoutes = require("./todolistRoute");
app.use("/api", todolistRoutes);

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
