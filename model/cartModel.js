const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 }
      },
    ],
    // totalQuantity: { type: Number, default: 0 },
    status: {
      type: String,
      default: "pending"
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);