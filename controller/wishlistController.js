const Wishlist = require("../model/wishlistModel")


exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const existingItem = await Wishlist.findOne({ userId, productId });

        if (existingItem) return res.status(400).json({ message: "Already in wishlist" });

        const wishlistItem = new Wishlist({ userId, productId });
        await wishlistItem.save();
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ error: "Error adding to wishlist" });
    }
};


exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        await Wishlist.findOneAndDelete({ userId, productId });
        res.status(200).json({ message: "Removed from wishlist" });
    } catch (error) {
        res.status(500).json({ error: "Error removing from wishlist" });
    }
};


exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const wishlistItems = await Wishlist.find({ userId }).populate("productId");
        res.status(200).json(wishlistItems.map(item => item.productId));
    } catch (error) {
        res.status(500).json({ error: "Error fetching wishlist" });
    }
};
