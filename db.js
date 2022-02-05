require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const menuSchema = {
	logo: String,
	name: String,
	description: String,
	price: String,
	category: String
};
const Menu = mongoose.model("Menu",menuSchema);

const invoiceSchema = {
  list: [{key: Number, name: String, price: String, qty: Number}], 
  name: String, 
  number: String, 
  total: Number
};
const Invoice = mongoose.model("Invoice",invoiceSchema);

module.exports = {Menu, Invoice};