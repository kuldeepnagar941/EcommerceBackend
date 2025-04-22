const mongoose = require("mongoose")

const userOrderSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
   productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
   },
   addressId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"address"
    },
    payment_mode:{
        type: String,
         enum: ["COD", "Online"],
        required: true
    },

    
},

    {timestamps:true}
)
module.exports = mongoose.model("userOrder",userOrderSchema)
