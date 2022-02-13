require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require("cors");
const path = require('path');
const Port = process.env.PORT || 5000;
const { Invoice, Menu, Admin } = require('./db');

app.use(cors());
app.use(express.json());

app.get('/loadmenu', function (req,res){
	Menu.find().then((item) => {
		return res.json(item)
	})
});

app.post('/print', (req,res) => {
	var obj = new Invoice(req.body);
	obj.save();
});

app.post('/login', async (req, res) => {
	try{
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
			res.status(200).json({ token: token });
    }
	} catch (err) {
		console.log(err);
	}
});

app.get('/admin', (req, res) => {
	Invoice.find().then((item) => {
		return res.json(item)
	})
});

app.patch('/admin', (req, res) => {
	const id = req.body.id;
	const served = req.body.served;

	Invoice.findOneAndUpdate(
		{_id: id}, 
		{served: served}, 
		() => {
			console.log("Order marked as served.")
		}
	);
});

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get("*",(req,res) => {
		res.sendFile(path.resolve(__dirname, "frontend","build","index.html"))
	})
}

app.listen(Port,() => {
	console.log("App is running on port "+Port);
});