const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: String,
  imageURL: String,
  price: Number,
  category: String,
  rating: Number,
});

module.exports = mongoose.model("products", ProductSchema);
