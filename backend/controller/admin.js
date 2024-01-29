const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin, Invoice } = require("../model");

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

  Invoice.findOneAndUpdate({ _id: id }, { served: served }, () => {
    console.log("Order marked as served.");
  });
};

module.exports = { adminLogin, getInvoices, updateInvoice };
