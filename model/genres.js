const mongoose = require("mongoose");
const Joi = require("joi");

// Schema and Model
const genresSchema = new mongoose.Schema({
  genres: { type: String, required: true, minlength: 2, maxlength: 30 },
});

const Genres = mongoose.model("Genres", genresSchema);

// Validation
const genresValidation = (genres) => {
  const schema = Joi.object({
    genres: Joi.string().min(2).max(30).required(),
  });
  return schema.validate(genres);
};

const genresUpdateValidation = (paramsID) => {
  const objectIdSchema = Joi.objectId().required();
  return objectIdSchema.validate(paramsID);
};

exports.GenresSchema = genresSchema;
exports.Genres = Genres;
exports.genresUpdateValidation = genresUpdateValidation;
exports.GenresValidation = genresValidation;
