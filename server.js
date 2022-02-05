require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Port = process.env.PORT || 5000;
const { Invoice, Menu } = require('./db');

app.use(cors());
app.use(express.json());

app.post('/print', (req,res) => {
	var obj = new Invoice(req.body);
	obj.save();
})

app.get('/loadmenu', function (req,res){
	Menu.find().then((item) => {
		return res.json(item)
	})
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