const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin, Invoice, Menu } = require("../model");

const adminLogin = async (req, res) => {
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
};

const getInvoices = (req, res) => {
  Invoice.find().then((item) => {
    return res.json(item);
  });
};

const updateInvoice = (req, res) => {
  const id = req.body.id;
  const served = req.body.served;

  Invoice.findOneAndUpdate({ _id: id }, { served: served }, (err) => {
    if (err) {
      res.json({ message: err.message });
    }
    res.json({ message: "Order marked as served" });
  });
};

const updatePayment = (req, res) => {
  const id = req.body.id;
  const paid = req.body.paid;

  Invoice.findOneAndUpdate({ _id: id }, { paid: paid }, (err) => {
    if (err) {
      res.json({ message: err.message });
    }
    res.json({ message: "Marked as paid" });
  });
};

const updateMenu = (req, res) => {
  const id = req.body.id;
  const item = req.body.item;

  Menu.findOneAndUpdate({ _id: id }, { $set: item }, (err) => {
    if (err) {
      res.json({ message: err.message });
    }
    res.json({ message: "Item Updated" });
  });
};

const deleteItem = (req, res) => {
  const id = req.params.id;

  Menu.findOneAndDelete({ _id: id }, (err) => {
    if (err) {
      res.json({ message: err.message });
    }
    res.json({ message: "Item Deleted" });
  });
};

module.exports = {
  adminLogin,
  getInvoices,
  updateInvoice,
  updatePayment,
  updateMenu,
  deleteItem,
};
