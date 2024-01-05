const mongoose = require("mongoose");
const Joi = require("joi");

// Schema
const customerSchema = new mongoose.Schema({
  email: { type: String, required: true, minlength: 0, maxlength: 250 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 0, maxlength: 11 },
});

// Model
const Customer = mongoose.model("Customer", customerSchema);

// Validation
const CustomerDataValidation = (customerData) => {
  const schema = Joi.object({
    email: Joi.string().min(0).max(250).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(0).max(11).required(),
  });

  return schema.validate(customerData);
};

const CustomerParamsValidation = (parmas) => {
  const schema = Joi.objectId().required();

  return schema.validate(parmas);
};

exports.CustomerDataValidation = CustomerDataValidation;
exports.CustomerParamsValidation = CustomerParamsValidation;
exports.Customer = Customer;
