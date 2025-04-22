const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder,getAllOrdersseller } = require("../controller/sellerOderController");


router.post("/", createOrder)
router.get("/:id", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

router.get("/getsellerorder/:id",getAllOrdersseller)

module.exports = router;


