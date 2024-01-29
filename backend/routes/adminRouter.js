const express = require("express");
const adminRouter = express.Router();
const {
  adminLogin,
  getInvoices,
  updateInvoice,
} = require("../controller/admin");

adminRouter.post("/login", adminLogin);
adminRouter.get("/invoices", getInvoices);
adminRouter.patch("/markserved", updateInvoice);

module.exports = adminRouter;
