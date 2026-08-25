const express = require("express");
//const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));


// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/weather", require("./routes/weather"));

// test route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// mongo connect
/*
//mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  */

const PORT =  process.env.PORT ||5000;
app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server running on port ${PORT}`);
});
