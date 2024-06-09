// DB gets connected first before handling HTTP requestes
const db = require("./db.js");
const express = require("express");
const app = express();
PORT = 4000;

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //getting data in req.body

app.get("/", (req, res) => {
  res.send("Welcome to Hotel!");
});

//Import router files
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
// Use the person routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

//Listener
app.listen(PORT, () => {
  console.log(`Server running...${PORT}`);
});
