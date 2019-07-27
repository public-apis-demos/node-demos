const router = require("express").Router();
const verifyToken = require("../routes/verifyToken");
router.get("/", (req, res) => {
  res.send(req.user);
});

router.get("/settings", verifyToken, (req, res) => {
  res.json({
    name: "hello"
  });
});

module.exports = router;
