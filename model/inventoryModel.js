const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model('inventory', inventorySchema);
