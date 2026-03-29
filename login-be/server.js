const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // only once

const app = express();

// middleware

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json()); // for parsing application/json

// register route
const registerRoute = require("./routes/register");
app.use("/register", registerRoute);

// login route
const loginRoute = require("./routes/login");
app.use("/login", loginRoute);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

// test route
app.get("/", (req,res) => res.send("API running..."));

// start server
app.listen(5000, ()=> console.log("Server running on port 5000"));