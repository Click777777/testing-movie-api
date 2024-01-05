const express = require("express");
const app = express();

// throw new Error("Error first -----------------");
// const p = Promise.reject(new Error("Async Error throw"));
// p.then(() => console.log("rejected!"));

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/import")();
require("./startup/isKey")();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
