const mongoose = require("mongoose");
const { GenresSchema } = require("./genres");
const Joi = require("joi");

// Schema
const movieDetailSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 300 },
  genres: { type: GenresSchema, required: true },
  inStock: { type: Number, required: true, min: 0, max: 1000 },
  rentalRate: { type: Number, required: true, min: 0, max: 1000 },
});

// Model
const MovieDetail = mongoose.model("MovieDetail", movieDetailSchema);

// Validation
const movieDetailDataValidation = (movieDetailData) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(300).required(),
    genres: Joi.objectId().required(),
    inStock: Joi.number().min(0).max(1000).required(),
    rentalRate: Joi.number().min(0).max(1000).required(),
  });
  return schema.validate(movieDetailData);
};

const movieDetailParmasValidation = (movieDetailParmas) => {
  const schema = Joi.objectId().required();
  return schema.validate(movieDetailParmas);
};

exports.MovieDetail = MovieDetail;
exports.movieDetailDataValidation = movieDetailDataValidation;
exports.movieDetailParmasValidation = movieDetailParmasValidation;
