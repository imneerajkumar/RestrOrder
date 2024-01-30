const express = require("express");
const userRouter = express.Router();
const { makePayment, getMenu, saveInvoice } = require("../controller/user");

userRouter.post("/razorpay", makePayment);
userRouter.get("/loadmenu", getMenu);
userRouter.post("/print", saveInvoice);

module.exports = userRouter;
