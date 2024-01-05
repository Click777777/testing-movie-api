const express = require("express");
const { usersValidation, USERS } = require("../model/users");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleWare = require("../middleware/auth");

router.get("/me", authMiddleWare, async (req, res) => {
  const user = await USERS.findOne({ email: req.user.email }).select(
    "-password"
  );
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = usersValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let isUser = await USERS.findOne({ email: req.body.email });
  if (isUser) return res.status(400).send("Email was already registered");

  isUser = new USERS({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  isUser.password = await bcrypt.hash(isUser.password, salt);
  await isUser.save();

  const token = isUser.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(isUser, ["_id", "name", "email"]));
});

module.exports = router;
