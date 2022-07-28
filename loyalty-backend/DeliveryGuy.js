const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number,
  etd: String,
});

module.exports = mongoose.model("DeliveryGuy", ProductSchema);