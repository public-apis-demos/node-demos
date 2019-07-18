const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth");
const {
  registerValidation,
  loginValidation
} = require("../validation/validation");
router.post("/register", async (req, res) => {
  //res.send("register api");

  //LETS VALIDATE THE DATA
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist = await Auth.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //HASH the passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new Auth({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/login", async (req, res) => {
  //LETS VALIDATE THE DATA
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  const user = await Auth.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  //PASSWORD IS CORRECT?
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is wrong");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
