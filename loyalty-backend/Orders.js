const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  price: Number,
  products: Array,
  email: String,
  address: Object,
  isOutForDelivery: Boolean, default:false,
});

module.exports = mongoose.model("orders", OrderSchema);
