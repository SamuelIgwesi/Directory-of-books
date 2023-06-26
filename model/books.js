const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String },
  isbn: { type: String, unique: true },
  publisher: {type: String}
});

module.exports = mongoose.model("Books", bookSchema);
