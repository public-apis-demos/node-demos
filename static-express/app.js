const express = require("express");
var exphbs = require("express-handlebars");
const app = express();

const port = 3000;
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
