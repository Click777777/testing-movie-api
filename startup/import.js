module.exports = () => {
  require("dotenv").config();
  const Joi = require("joi");
  Joi.objectId = require("joi-objectid")(Joi);
};
