const mongoose = require("mongoose");

const menuSchema = {
  logo: String,
  name: String,
  description: String,
  price: String,
  category: String,
  veg: String,
};
const Menu = mongoose.model("Menu", menuSchema);

const invoiceSchema = {
  list: [],
  name: String,
  number: String,
  table: Number,
  total: Number,
  paid: Boolean,
  served: Boolean,
  paymentId: String,
  orderId: String,
};
const Invoice = mongoose.model("Invoice", invoiceSchema);

const adminSchema = {
  adminId: String,
  password: String,
};
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Menu, Invoice, Admin };
