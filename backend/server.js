require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

const Port = process.env.PORT || 5000;
const url = process.env.MONGO_URL;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb is conneccted");
  })
  .catch((e) => {
    console.log("Mogodb not connected");
  });

app.get("/api/logo", (req, res) => {
  res.sendFile(path.join(__dirname, "/restaurant.png"));
});

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(Port, () => {
  console.log("App is running on port " + Port);
});
