const Joi = require("joi");
const mongoose = require("mongoose");

// Schema
const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      email: { type: String, required: true, minlength: 1, maxlength: 250 },
      isGold: { type: Boolean, default: false },
      phone: { type: String, required: true, minlength: 3, maxlength: 11 },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 250,
        trim: true,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
      },
    }),
    required: true,
  },
  rentalDate: { type: Date, required: true, default: Date.now },
  getbackDate: { type: Date, default: new Date(0), required: true },
  rentalFee: { type: Number, required: true, default: 0, min: 0, max: 1000 },
});

// Model
const Rental = mongoose.model("Rental", rentalSchema);

// Validation
const rentalDataValidation = (rentalData) => {
  const schema = Joi.object({
    customer: Joi.objectId().required(),
    movie: Joi.objectId().required(),
    getbackDate: Joi.date(),
  });
  return schema.validate(rentalData);
};

const rentalParmasValidation = (rentalParmas) => {
  const schema = Joi.objectId().required();
  return schema.validate(rentalParmas);
};

exports.Rental = Rental;
exports.rentalDataValidation = rentalDataValidation;
exports.rentalParmasValidation = rentalParmasValidation;
