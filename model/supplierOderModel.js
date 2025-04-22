const mongoose = require('mongoose');

const sellerOrderSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true
    },
    status: {
        type: String,
        default:'initied'
    },
    payment_mode: {
        type: String,
        required: true
    },
   
    quantity:{
        type:Number,
        // required:true,
    },
    status: { 
        type: String, 
        enum: ["Cancel", "Packing", "Delivery", "Return", "Approve", "Returned", "initiate"], 
        default: "initiate" 
    }
}, { timestamps: true,versionKey:false });

module.exports = mongoose.model(' sellerorder', sellerOrderSchema);