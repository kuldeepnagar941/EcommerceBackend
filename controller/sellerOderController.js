const Order = require("../model/supplierOderModel");
const userModel = require("../model/userModel");
const productModel = require ("../model/productModel");
const Inventory = require('../model/inventoryModel');
const UserOrder = require("../model/userOrderModel");
const Cart = require("../model/cartModel");



const createOrder = async (req, res) => {
    try {
      console.log("reqbody>>>>>>>>>>>>>>>>>>>>>>", req.body);
  
      const { sellerId, productId, quantity, addressId, status, userId, payment_mode } = req.body;
  
      const inventory = await Inventory.findOne({ productId, sellerId });
      console.log(">>>>>>>>>Inventory data:", inventory); 
      if (!inventory) {
        return res.status(404).json({ success: false, message: "Inventory not found for this product and seller." });
      }
  
      if (inventory.quantity < quantity) {
        return res.status(400).json({ success: false, message: "Insufficient inventory." });
      }
  
      inventory.quantity -= quantity;
      inventory.updatedAt = new Date();
      const result = await inventory.save();
      console.log(">>>>>>>>>>>>>>>>result", req.body);
  
      const order = new Order(req.body);
      console.log("Received order data:", req.body);
      await order.save();
  
      const newOrder = new UserOrder({
        userId,
        productId,
        addressId,
        payment_mode
      });
  
      await newOrder.save();
  
      // Update cart 
      const updatedCart = await Cart.findOneAndUpdate(
        { user: userId, "items.product": productId },
        { status: "fulfilled" },
        { new: true }
      );
  
      console.log("Updated Cart:", updatedCart);
  
      res.status(201).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
      console.error("Error creating order:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({userId:req.params.id}).populate("productId");
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllOrdersseller = async (req, res) => {
    try {
        console.log(">>>>>>>>>",req.params.id);
        
        const sellerId = req.params.id;
        console.log("sellerId>>>>>>>>>>>>>>",sellerId);
        
        const order = await Order.find({sellerId}).populate("productId");
        
        res.status(200).json({ success: true, order });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: error.message }); 
    }
};


const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.userId).populate("productId");
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const newStatus = req.body.status;

        const existingOrder = await Order.findById(orderId);
        if (!existingOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

       
        if ((newStatus === "Cancel" || newStatus === "Return") && existingOrder.status !== newStatus) {
            const { productId, quantity } = existingOrder;

            const inventory = await Inventory.findOne({ productId });

            if (inventory) {
                inventory.quantity += quantity;
                await inventory.save();
                console.log(`Inventory updated: ${quantity} units added back for product ${productId}`);
            } else {
                console.warn(`No inventory found for product ID: ${productId}`);
            }
        }


        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder,getAllOrdersseller };
