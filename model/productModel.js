const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: { 
        type: String, 
        required: true 
    },
    title: {
         type: String,
          required: true
         },
    price: { 
        type: String, 
        required: true },
    size: { type: String, 
        required: true 
    }, 
    colour: {
         type: String,
          required: true 
        }, 
    description: { 
        type: String,
        required: true
        },
    active: {
        type: Boolean, 
        default: true
    },
    sellerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"seller",
        },
    //  quantity:{
    //     type:intiger
    //  }   
},{timestamps:true});


module.exports = mongoose.model("product",productSchema)
