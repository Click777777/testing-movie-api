const express = require("express");
const {
  MovieDetail,
  movieDetailDataValidation,
  movieDetailParmasValidation,
} = require("../model/movie");
const { Genres } = require("../model/genres");

const router = express.Router();

router.get("/", async (req, res) => {
  const doc = await MovieDetail.find();
  res.send(doc);
});

router.post("/", async (req, res) => {
  // Check Client Data Validation
  const { error } = movieDetailDataValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Genres from genres model
  const genresDoc = await Genres.findById(req.body.genres);
  if (!genresDoc)
    return res.status(400).send("Genres ID was not found in database");

  // create doc
  const createDoc = new MovieDetail({
    title: req.body.title,
    genres: {
      _id: genresDoc._id,
      genres: genresDoc.genres,
    },
    inStock: req.body.inStock,
    rentalRate: req.body.rentalRate,
  });
  const doc = await createDoc.save();
  res.send(doc);
});

router.put("/:id", async (req, res) => {
  // Check Client Data Validation
  const { error } = movieDetailDataValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { error: paramsError } = movieDetailParmasValidation(req.params.id);
  if (paramsError) return res.status(400).send(paramsError.details[0].message);

  // Genres from genres model
  const genresDoc = await Genres.findById(req.body.genres);
  if (!genresDoc)
    return res.status(400).send("Genres ID was not found in database");

  // update doc
  const doc = await MovieDetail.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        genres: {
          _id: genresDoc._id,
          genres: genresDoc.genres,
        },
        inStock: req.body.inStock,
        rentalRate: req.body.rentalRate,
      },
    },
    { new: true }
  );

  if (!doc) return res.status(400).send("The parmas ID was not in database ");
  res.send(doc);
});

router.delete("/:id", async (req, res) => {
  // Check Client Data Validation
  const { error: paramsError } = movieDetailParmasValidation(req.params.id);
  if (paramsError) return res.status(400).send(paramsError.details[0].message);

  // delete doc
  const doc = await MovieDetail.findByIdAndDelete(req.params.id);

  if (!doc) return res.status(400).send("The parmas ID was not in database ");
  res.send(doc);
});

router.get("/:id", async (req, res) => {
  // Check Client Data Validation
  const { error: paramsError } = movieDetailParmasValidation(req.params.id);
  if (paramsError) return res.status(400).send(paramsError.details[0].message);

  // get doc by id
  const doc = await MovieDetail.findById(req.params.id);

  if (!doc) return res.status(400).send("The parmas ID was not in database ");
  res.send(doc);
});

module.exports = router;
