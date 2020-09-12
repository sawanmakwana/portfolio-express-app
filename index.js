const express = require("express");
const Joi = require("joi");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://sawan_mak:jGlAN2TsQLWoOaW3@cluster0.yudat.mongodb.net/portfolio?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
  }
);

mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (err) => {
    console.log("mY ERROR", err);
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api", routes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(5000, () =>
  console.log(`Listining on port ${5000}----------------->`)
);
