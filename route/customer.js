const express = require("express");
const {
  Customer,
  CustomerDataValidation,
  CustomerParamsValidation,
} = require("../model/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  const doc = await Customer.find();
  res.send(doc);
});

router.post("/", async (req, res) => {
  const { error } = CustomerDataValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const doc = new Customer({
    email: req.body.email,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  const savedDoc = await doc.save();
  res.send(savedDoc);
});

router.put("/:id", async (req, res) => {
  const { error } = CustomerDataValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { error: paramsError } = CustomerParamsValidation(req.params.id);
  if (paramsError) {
    return res.status(400).send(paramsError.details[0].message);
  }

  const doc = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
    },
    { new: true }
  );

  if (!doc) return res.status(400).send("The ID was not found in database");
  res.send(doc);
});

router.delete("/:id", async (req, res) => {
  const { error: paramsError } = CustomerParamsValidation(req.params.id);
  if (paramsError) {
    return res.status(400).send(paramsError.details[0].message);
  }

  const doc = await Customer.findByIdAndDelete(req.params.id);

  if (!doc) return res.status(400).send("The ID was not found in database");
  res.send(doc);
});

router.get("/:id", async (req, res) => {
  const { error: paramsError } = CustomerParamsValidation(req.params.id);
  if (paramsError) {
    return res.status(400).send(paramsError.details[0].message);
  }

  const doc = await Customer.findById(req.params.id);

  if (!doc) return res.status(400).send("The ID was not found in database");
  res.send(doc);
});

module.exports = router;
