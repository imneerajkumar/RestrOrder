require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const Port = process.env.PORT || 5000;
const { Invoice, Menu, Admin } = require("./db");

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET,
});

app.get("/logo", (req, res) => {
  res.sendFile(path.join(__dirname, "/restaurant.png"));
});

app.post("/razorpay", async (req, res) => {
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
});

app.get("/loadmenu", function (req, res) {
  try {
    Menu.find().then((item) => {
      return res.json(item);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/print", (req, res) => {
  try {
    var obj = new Invoice(req.body);
    obj.save();
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const adminId = req.body.admin;
    const password = req.body.password;
    const admin = await Admin.findOne({ adminId });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        { admin_id: admin._id, adminId },
        process.env.TOKEN,
        {
          expiresIn: "2h",
        }
      );
      res.json({ token: token });
    } else {
      res.json({ message: "Wrong Id or password" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/invoices", (req, res) => {
  Invoice.find().then((item) => {
    return res.json(item);
  });
});

app.patch("/invoices", (req, res) => {
  const id = req.body.id;
  const served = req.body.served;

  Invoice.findOneAndUpdate({ _id: id }, { served: served }, () => {
    console.log("Order marked as served.");
  });
});

app.listen(Port, () => {
  console.log("App is running on port " + Port);
});
