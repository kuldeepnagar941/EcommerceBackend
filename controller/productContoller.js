const Product = require("../model/productModel");
const Inventory = require('../model/inventoryModel');


exports.createProduct = async (req, res) => {
    try {
        const { sellerId, quantity } = req.body;
        const product = new Product(req.body);
        console.log(req.body)
        await product.save();
    //     res.status(201).json({ message: "Product created successfully", product });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    const inventory = new Inventory({
        productId: product._id,
        sellerId: sellerId, 
        quantity: quantity || 0
      });
      await inventory.save();
  
      res.status(201).json({
        message: "Product and inventory created successfully",
        product,
        inventory
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
exports.allproduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllProducts = async (req, res) => {
    
    try {
        const {userid} = req.params
        const products = await Product.find({sellerId:userid});
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProductsInactive = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getoneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        console.log(req.body)
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Soft delete 
exports.softDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "Product deactivated", product });
    } catch (error) {
        res.status(500).json({ message: "Error deactivating product", error });
    }
};
// Restore soft
exports.restoreProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "Product restored", product });
    } catch (error) {
        res.status(500).json({ message: "Error restoring product", error });
    }
};