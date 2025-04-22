const express = require("express");
const cartController = require("../controller/cartController.js");
// const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/:userId", cartController.getCart);
router.post("/add",  cartController.addToCart);
router.delete("/remove/:bookId", cartController.removeFromCart);
router.delete("/clear",  cartController.clearCart);
router.put("/update/:cartId", cartController.updateCart);

module.exports = router;
