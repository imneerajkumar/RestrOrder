const express = require("express");
const userRouter = express.Router();
const { makePayment, getMenu, getInvoice } = require("../controller/user");

userRouter.post("/razorpay", makePayment);
userRouter.get("/loadmenu", getMenu);
userRouter.post("/print", getInvoice);

module.exports = userRouter;
