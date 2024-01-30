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
    res.json({ message: err.message });
  }
};

const getInvoices = (req, res) => {
  try {
    Invoice.find().then((item) => {
      return res.json(item);
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateInvoice = (req, res) => {
  const id = req.body.id;
  const served = req.body.served;

  try {
    Invoice.findOneAndUpdate({ _id: id }, { served: served }, (err) => {
      if (err) {
        res.json({ message: err.message });
      }
      res.json({ message: "Order marked as served" });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updatePayment = (req, res) => {
  const id = req.body.id;
  const paid = req.body.paid;

  try {
    Invoice.findOneAndUpdate({ _id: id }, { paid: paid }, (err) => {
      if (err) {
        res.json({ message: err.message });
      }
      res.json({ message: "Marked as paid" });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const getMenu = (req, res) => {
  try {
    Menu.find().then((item) => {
      return res.json(item);
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const addInMenu = (req, res) => {
  const item = req.body;

  try {
    var obj = new Menu(item);
    obj
      .save()
      .then((item) => res.json({ message: `${item.name} added to menu` }));
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateInMenu = (req, res) => {
  const id = req.body.id;
  const item = req.body.item;

  try {
    Menu.findOneAndUpdate({ _id: id }, { $set: item }, (err) => {
      if (err) {
        res.json({ message: err.message });
      }
      res.json({ message: "Item Updated" });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const deleteInMenu = (req, res) => {
  const id = req.params.id;

  try {
    Menu.findOneAndDelete({ _id: id }, (err) => {
      if (err) {
        res.json({ message: err.message });
      }
      res.json({ message: "Item Deleted" });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = {
  adminLogin,
  getInvoices,
  updateInvoice,
  updatePayment,
  getMenu,
  addInMenu,
  updateInMenu,
  deleteInMenu,
};
