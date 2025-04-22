const express = require("express");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controller/wishlistController");

const router = express.Router();

router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);
router.get("/:userId", getWishlist);

module.exports = router;
