const mongoose= require("mongoose")

const ParcelSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true,
    },
    address : {
        type:String,
        required:true,
    },
    weight : {
        type:String,
        required:true,
    },
    value : {
        type:Number,
        required:true,
    },
    isApproved : {
        type : Boolean,
        required : true,
    }
})

module.exports = mongoose.model("Parcel",ParcelSchema);