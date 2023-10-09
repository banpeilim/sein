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

const attendeeSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: Date,
  },
});

attendeeSchema.pre("save", function (next) {
  // Check if 'checkInTime' is not already set
  if (!this.checkInTime) {
    // Set 'checkInTime' to the current date and time
    this.checkInTime = new Date();
  }
  next();
});


const companySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Attendee = mongoose.model("Attendee", attendeeSchema);
const Company = mongoose.model("Company", companySchema);


module.exports = {
  User,
  Product,
  Attendee,
  Company,
};
