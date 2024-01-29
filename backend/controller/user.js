const Razorpay = require("razorpay");
const { Menu, Invoice } = require("../model");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET,
});

const makePayment = async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMenu = (req, res) => {
  try {
    Menu.find().then((item) => {
      return res.json(item);
    });
  } catch (error) {
    console.log(error);
  }
};

const getInvoice = (req, res) => {
  try {
    var obj = new Invoice(req.body);
    obj.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { makePayment, getMenu, getInvoice };
