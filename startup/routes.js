const express = require("express");

const genres = require("../route/genres");
const customer = require("../route/customer");
const movie = require("../route/movie");
const rental = require("../route/rental");
const users = require("../route/users");
const auth = require("../route/auth");
const error = require("../middleware/error");

const routes = (app) => {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customer", customer);
  app.use("/api/movie", movie);
  app.use("/api/rental", rental);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use(error);
};

module.exports = routes;
