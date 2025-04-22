const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
         required:true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        trim:true,
        enum:["seller","user"],
        default:"user"
        
    },
    sellerDetails: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"seller",
        default:null,
    }

}, { timestamps: true, versionKey: false })


module.exports = mongoose.model("user",userSchema)