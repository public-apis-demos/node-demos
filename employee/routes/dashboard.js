const router = require("express").Router();
const verify = require("../routes/auth");
router.get("/", (req, res) => {
  res.send(req.user);
});

router.get("/settings", verify, (req, res) => {
  res.json({
    name: "hello"
  });
});

module.exports = router;
