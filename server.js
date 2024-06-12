// DB gets connected first before handling HTTP requestes
const db = require("./db.js");
const express = require("express");
const app = express();
require("dotenv").config();
// ensures that the online hosted server machine uses its port
PORT = process.env.PORT || 4000;

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //getting data in req.body

// Middleware function
const logRequest = require("./middleware/logRequest");
app.use(logRequest);

// Authentication
const passport = require("./middleware/auth");
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to Hotel!");
});

//Import router files
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

app.use("/person", personRoutes);
app.use("/menu", localAuthMiddleware, menuRoutes);

//Listener
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
