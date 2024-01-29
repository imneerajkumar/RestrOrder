const mongoose = require("mongoose");

const menuSchema = {
  logo: String,
  name: String,
  description: String,
  price: String,
};
const Menu = mongoose.model("Menu", menuSchema);

const invoiceSchema = {
  list: [{ key: Number, name: String, price: String, qty: Number }],
  name: String,
  number: String,
  total: Number,
  mode: String,
  served: Boolean,
};
const Invoice = mongoose.model("Invoice", invoiceSchema);

const adminSchema = {
  adminId: String,
  password: String,
};
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Menu, Invoice, Admin };
