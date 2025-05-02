const Cart = require("../model/cartModel.js");
const Product = require("../model/productModel.js");

const getCart = async (req, res) => {
    const { userId } = req.params; 
    try {
        const cart = await Cart.findOne({ user: userId,status : "pending" }).populate("items.product");

        // if (!cart) {
        //     return res.status(404).json({ message: "Cart not found" });
        // }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    const { productId, userId } = req.body;
    try {
      let cart = await Cart.findOne({ user: userId });
      
      if (!cart) {
        cart = new Cart({ user: userId, items: [], totalQuantity: 0 });
      }
  
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      const itemIndex = cart.items.findIndex((item) => item.product.equals(productId));
  
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }
  
      cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
  
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => !item.product.equals(req.params.productId));

    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
      const { cartId } = req.params; 
      const { productId, totalQuantity } = req.body; 

      
      let cart = await Cart.findById(cartId);
      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      
      const item = cart.items.find(item => item.product.toString() === productId);
      if (!item) {
          return res.status(404).json({ message: "Product not found in cart" });
      }

      
      item.quantity = totalQuantity;

      
      if (item.quantity <= 0) {
          cart.items = cart.items.filter(item => item.product.toString() !== productId);
      }

      
      await cart.save();


     
      cart = await cart.populate("items.product");

      res.status(200).json({ message: "Product quantity updated successfully", cart });
  } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: error.message });
  }
};


module.exports = { getCart, addToCart, removeFromCart, clearCart , updateCart  };
