const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { authValidation } = require("../model/auth");
const { USERS } = require("../model/users");

router.post("/", async (req, res) => {
  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let isUser = await USERS.findOne({ email: req.body.email });
  if (!isUser) return res.status(400).send("Incorrect Email");

  const validPassword = await bcrypt.compare(
    req.body.password,
    isUser.password
  );
  if (!validPassword) return res.status(400).send("Incorrect Password");
  const token = isUser.generateAuthToken();
  res.send(token);
});

module.exports = router;
