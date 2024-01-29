const express = require("express");
const adminRouter = express.Router();
const {
  adminLogin,
  getInvoices,
  updateInvoice,
  updatePayment,
  updateMenu,
  deleteItem,
} = require("../controller/admin");

adminRouter.post("/login", adminLogin);
adminRouter.get("/invoices", getInvoices);
adminRouter.patch("/markserved", updateInvoice);
adminRouter.patch("/markpaid", updatePayment);
adminRouter.put("/updatemenu", updateMenu);
adminRouter.delete("/deleteitem/:id", deleteItem);

module.exports = adminRouter;
