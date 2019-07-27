const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.send(req.user);
});

router.get("/settings", (req, res) => {
  res.send("my setting info");
});

router.get("/any", verify, (req, res) => res.send("Hello World!"));

module.exports = router;
