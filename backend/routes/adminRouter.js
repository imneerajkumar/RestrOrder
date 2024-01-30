const express = require("express");
const adminRouter = express.Router();
const {
  adminLogin,
  getInvoices,
  updateInvoice,
  updatePayment,
  getMenu,
  addInMenu,
  updateInMenu,
  deleteInMenu,
} = require("../controller/admin");

adminRouter.post("/login", adminLogin);
adminRouter.get("/invoices", getInvoices);
adminRouter.patch("/markserved", updateInvoice);
adminRouter.patch("/markpaid", updatePayment);

adminRouter.get("/getMenu", getMenu);
adminRouter.post("/addInMenu", addInMenu);
adminRouter.put("/updateInMenu", updateInMenu);
adminRouter.delete("/deleteInMenu/:id", deleteInMenu);

module.exports = adminRouter;
