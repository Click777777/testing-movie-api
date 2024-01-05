const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true, minlegth: 2, maxlength: 20 },
  email: {
    type: String,
    required: true,
    minlegth: 2,
    maxlength: 250,
    unique: true,
  },
  password: { type: String, required: true, minlegth: 7, maxlength: 300 },
  isAdmin: Boolean,
});

usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey
  );
  return token;
};

const USERS = mongoose.model("USERS", usersSchema);

const usersValidation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().min(2).max(250).required().email(),
    password: Joi.string().min(7).max(300).required(),
  });
  return schema.validate(user);
};

exports.USERS = USERS;
exports.usersValidation = usersValidation;
