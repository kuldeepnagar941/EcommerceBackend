const Order = require("../model/userOrderModel");


const createOrder = async (req, res) => {
    try {
        const { userId, cartId, addressId, paymentMode } = req.body;
        
        const newOrder = new Order({
            userId,
            cartId,
            addressId,
            paymentMode
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllOrdersUser = async (req, res) => {
    try {
        console.log(">>>>>>>>>",req.params.id);
        
        const userId = req.params.id;
        console.log("sellerId>>>>>>>>>>>>>>",userId);
        
        const order = await Order.find({userId}).populate("productId");
        
        res.status(200).json({ success: true, order });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: error.message }); 
    }
};









