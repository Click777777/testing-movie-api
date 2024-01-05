const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb://0.0.0.0:27017/movie")
    .then(() => console.log("DB Connection -> Successful"))
    .catch((err) => {
      throw new Error("DB Connection -> Failed");
    });
};
module.exports = db;
