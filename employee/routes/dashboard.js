const router = require("express").Router();
router.get("/", (req, res) => {
  res.send(req.user);
});

router.get("/settings", (req, res) => {
  res.json({
    name: "hello"
  });
});

module.exports = router;
