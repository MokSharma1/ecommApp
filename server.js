const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes/authRoute");
const PORT = process.env.PORT || 3000;
const path = require("path");

// Connecting to Database
const db = require("./config/db");
db();

const app = express();

// Using essential middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", routes);
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// app.get('/',(req,res)=>{res.send(`Welcome to the Ecommerce store`)})
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Couldn"t listen`);
  }
  console.log(`listening`.bgWhite.black);
});
