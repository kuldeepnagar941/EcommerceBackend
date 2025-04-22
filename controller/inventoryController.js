const Inventory = require('../model/inventoryModel')
//const Seller = require('../model/sellerModel')
const User = require('../model/userModel')
const express = require('express');


exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('productId');

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Server error' });
  }
 
};

exports.updateInventory = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity == null || quantity < 0) {
      return res.status(400).json({ message: 'Quantity must be a non-negative number' });
    }

    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    const updatedQuantity = inventory.quantity + quantity;

    inventory.quantity = updatedQuantity;
    await inventory.save();

    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  