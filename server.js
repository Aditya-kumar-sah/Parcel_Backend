require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const parcelsRoute = require("./routes/parcels");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Parcel backend running");
});

app.use("/auth", authRoute);
app.use("/parcels", parcelsRoute);

const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
