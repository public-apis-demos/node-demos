const router = require("express").Router();
const verify = require("./verifyToken");
router.get("/", verify, (req, res) => {
  res.send(req.user);
});

router.get("/settings", verify, (req, res) => {
  res.json({
    name: "hello"
  });
});

module.exports = router;
