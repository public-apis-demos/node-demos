// import packages

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const verify = require("./routes/verifyToken");

var exphbs = require("express-handlebars");

// define the variable
const app = express();
const hostname = "127.0.0.1";
const port = 3001;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// use verify at the index level
// app.use(verify);
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", authRoutes);
app.use("/api/emp", empRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
