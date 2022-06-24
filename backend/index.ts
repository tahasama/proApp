const path = require("path");
require("dotenv").config();
const itnRoute = require("./routes/itn.ts");
const concreteRoute = require("./routes/concrete.ts");

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/itn", itnRoute);
app.use("/api/concrete", concreteRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
