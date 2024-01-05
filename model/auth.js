const Joi = require("joi");
const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlegth: 2,
    maxlength: 250,
  },
  password: { type: String, required: true, minlegth: 7, maxlength: 300 },
});

const AUTH = mongoose.model("AUTH", authSchema);

const authValidation = (auth) => {
  const schema = Joi.object({
    email: Joi.string().min(2).max(250).required().email(),
    password: Joi.string().min(7).max(300).required(),
  });
  return schema.validate(auth);
};

exports.AUTH = AUTH;
exports.authValidation = authValidation;
