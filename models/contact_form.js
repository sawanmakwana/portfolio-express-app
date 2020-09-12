const mongoose = require("mongoose");

const genereSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String
});

module.exports = mongoose.model("ContactForm", genereSchema);
