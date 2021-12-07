const mongoose = require("mongoose");

const mongourl = process.env.MONGO_URL;

mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((e) => console.log(e));
