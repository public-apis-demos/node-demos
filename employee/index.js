// import packages

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// define the variable
const app = express();
const port = 3000;
dotenv.config();
// mongodb connection

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// custom routes
const empRoutes = require("./routes/emp");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

// middleware information
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/emp", empRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log("your server is running");
});
