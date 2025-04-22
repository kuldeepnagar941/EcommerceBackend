const User = require('../model/userModel')
const Seller = require('../model/sellerModel')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({role:"user"});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllSeller = async (req,res) =>{
    try{
        const seller = await Seller.find().populate("userId");
        res.status(200).json(seller);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

exports.getAllProduct = async (req,res) =>{
    try{
        const product = await Product.find();
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}