const express = require("express");
const {
  Rental,
  rentalDataValidation,
  rentalParmasValidation,
} = require("../model/rental");
const { Customer } = require("../model/customer");
const { MovieDetail } = require("../model/movie");
const router = express.Router();

router.get("/", async (req, res) => {
  const doc = await Rental.find();
  res.send(doc);
});

router.post("/", async (req, res) => {
  // Check Client Data Validation
  const { error } = rentalDataValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Customer from genres model
  const customerDoc = await Customer.findById(req.body.customer);
  if (!customerDoc)
    return res.status(400).send("Customer ID was not found in database");

  // Customer from genres model
  const movieDoc = await MovieDetail.findById(req.body.movie);
  if (!movieDoc)
    return res.status(400).send("Movie ID was not found in database");

  // create rental doc
  const createDoc = new Rental({
    customer: {
      _id: customerDoc._id,
      email: customerDoc.email,
      isGold: customerDoc.isGold,
      phone: customerDoc.phone,
    },
    movie: {
      _id: movieDoc._id,
      title: movieDoc.title,
      dailyRentalRate: movieDoc.rentalRate,
    },
    getbackDate: req.body.getbackDate,
    rentalFee: movieDoc.rentalRate,
  });
  const doc = await createDoc.save();
  res.send(doc);
});

router.delete("/:id", async (req, res) => {
  // Check Client Data Validation
  const { error: paramsError } = rentalParmasValidation(req.params.id);
  if (paramsError) return res.status(400).send(paramsError.details[0].message);

  // delete doc
  const doc = await Rental.findByIdAndDelete(req.params.id);

  if (!doc) return res.status(400).send("The parmas ID was not in database ");
  res.send(doc);
});

router.get("/:id", async (req, res) => {
  // Check Client Data Validation
  const { error: paramsError } = rentalParmasValidation(req.params.id);
  if (paramsError) return res.status(400).send(paramsError.details[0].message);

  // get doc by id
  const doc = await Rental.findById(req.params.id);

  if (!doc) return res.status(400).send("The parmas ID was not in database ");
  res.send(doc);
});

module.exports = router;
