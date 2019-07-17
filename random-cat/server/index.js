const express = require("express");
var cors = require("cors");

const app = express();

const port = 3000;
//middlewares

app.use("*", cors());

app.use(express.json());
app.get("/meow", (req, res) => {
  // every time uniq cat image will geneate

  res.json({
    file: "https://purr.objects-us-east-1.dream.io/i/img_20170610_083826.jpg"
  });
});
app.listen(port, () => {
  console.log("server is running");
});
