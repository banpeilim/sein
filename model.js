const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  attendance: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

module.exports = {
  User,
  Product,
};
