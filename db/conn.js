const mongoose = require("mongoose")

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("MongoDB connected!");
    } catch (error) {
        console.log("Connection failed!",error);
    }
}

module.exports = connectDB;