const mongoose = require("mongoose");
require("dotenv").config();

// Define the MongoDB connection URL
// const mongoURL = process.env.DB_URL_LOCAL;
const mongoURL = process.env.DB_URL;

// Setup MongoDB Connection
/* useNewUrlParser: true: This option tells Mongoose to use the new URL parser instead of the deprecated one. It's necessary to use this option when connecting to a MongoDB database using a newer connection string.

useUnifiedTopology: true: This option tells Mongoose to use the new Server Discovery and Monitoring engine instead of the deprecated one. It's necessary to use this option when connecting to a MongoDB database using a newer connection string. */
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Mongose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB Server...");
});

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Exort database connection
module.exports = db;
