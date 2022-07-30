const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  price: Number,
  products: Array,
  email: String,
  address: Object,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("orders", OrderSchema);
