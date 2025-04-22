const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    shopname: {
        type: String,
        required:true
    },
   
    gst: {
        type: String,
        required: true
    }
    // catagaries: {
    //     type: String,
    //     required: true
    // }

}, { timestamps: true, versionKey: false })


module.exports = mongoose.model("seller",sellerSchema)