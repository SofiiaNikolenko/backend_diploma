require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
