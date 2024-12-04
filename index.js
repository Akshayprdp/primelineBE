const express = require("express");
const app = express();
require("dotenv").config();
const dbconnection = require("./config/dbconfig");
dbconnection.dbconfig();
const adminRoutes = require("./Routes/adminRoutes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello! The server is sucssfully running.");
});
