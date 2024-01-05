const express = require("express");
const {
  Genres,
  GenresValidation,
  genresUpdateValidation,
} = require("../model/genres");
const router = express.Router();
const authMiddleWare = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/asyncMiddleware");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    // throw new Error("Could not get the genres");
    const genres = await Genres.find();
    res.send(genres);
  })
);

router.post("/", authMiddleWare, async (req, res) => {
  const { error } = GenresValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genres = new Genres({
    genres: req.body.genres,
  });
  const genresDocument = await genres.save();

  res.send(genresDocument);
});

router.put("/:id", async (req, res) => {
  const { error } = GenresValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if (!mongoose.Types.ObjectId.isValid(req.params.id))
  //   return res.status(400).send("Invalid Genres ID");

  const { error: objectIdError } = genresUpdateValidation(req.params.id);
  if (objectIdError)
    return res.status(400).send(objectIdError.details[0].message);

  const genres = await Genres.findByIdAndUpdate(
    req.params.id,
    { $set: { genres: req.body.genres } },
    { new: true }
  );

  if (!genres)
    return res.status(400).send("Genres ID was not found in database");

  res.send(genres);
});

router.delete("/:id", [authMiddleWare, admin], async (req, res) => {
  const { error: objectIdError } = genresUpdateValidation(req.params.id);
  if (objectIdError) {
    return res.status(400).send(objectIdError.details[0].message);
  }

  const delectedDocument = await Genres.findByIdAndDelete(req.params.id);

  if (!delectedDocument)
    return res.status(400).send("The ID was not found in database");
  res.send(delectedDocument);
});

router.get("/:id", async (req, res) => {
  const { error: paramsError } = CustomerParamsValidation(req.params.id);
  if (paramsError) {
    return res.status(400).send(paramsError.details[0].message);
  }

  const doc = await Genres.findById(req.params.id);

  if (!doc) return res.status(400).send("The ID was not found in database");
  res.send(doc);
});

module.exports = router;
