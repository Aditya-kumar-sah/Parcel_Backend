const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./db/conn")
require("dotenv").config()


app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,  
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use('/uploads',express.static('uploads'))


if (process.env.NODE_ENV !== "test") {
  connectDB();
  app.listen(process.env.PORT, () => {
    console.log("Server running on PORT", process.env.PORT);
  });
}


module.exports = app;
